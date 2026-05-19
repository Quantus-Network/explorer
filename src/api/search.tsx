import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import { SEARCH_PREVIEW_RESULTS_LIMIT } from '@/constants/search-preview-results-limit';
import type { SearchAllResponse } from '@/schemas';
import type DataFetcher from '@/utils/fetcher';
import { getGqlString } from '@/utils/get-gql-string';

const getSearchVariables = (oriKeyword: string) => {
  let keyword_number = -1;
  if (!oriKeyword.startsWith('0x') && !Number.isNaN(Number(oriKeyword))) {
    keyword_number = Number(oriKeyword);
  }

  let keyword = oriKeyword;
  if (keyword.length > 0) {
    keyword = `${keyword}%`;
  }

  return {
    keyword,
    keyword_number,
    limit: SEARCH_PREVIEW_RESULTS_LIMIT
  };
};

export const search = (fetcher: DataFetcher) => ({
  all: () => {
    const SEARCH_ALL = gql`
      query SearchAll($keyword: String, $keyword_number: Int, $limit: Int) {
        transactions: transfer(
          limit: $limit
          where: { extrinsic: { id: { _ilike: $keyword } } }
        ) {
          extrinsic {
            id
            pallet
            call
          }
        }
        scheduledReversibleTransactions: scheduled_reversible_transfer(
          limit: $limit
          where: { tx_id: { _ilike: $keyword } }
        ) {
          extrinsic {
            id
            pallet
            call
          }
          tx_id
        }
        executedReversibleTransactions: executed_reversible_transfer(
          limit: $limit
          where: { tx_id: { _ilike: $keyword } }
        ) {
          tx_id
        }
        cancelledReversibleTransactions: cancelled_reversible_transfer(
          limit: $limit
          where: { tx_id: { _ilike: $keyword } }
        ) {
          tx_id
        }
        accounts: account(limit: $limit, where: { id: { _ilike: $keyword } }) {
          id
        }
        blocks: block(
          limit: $limit
          where: {
            _or: [
              { hash: { _ilike: $keyword } }
              { height: { _eq: $keyword_number } }
            ]
          }
        ) {
          height
        }
        highSecuritySets: high_security_set(
          limit: $limit
          where: { extrinsic: { id: { _ilike: $keyword } } }
        ) {
          extrinsic {
            id
            pallet
            call
          }
        }
        minerRewards: miner_reward(
          limit: $limit
          where: { block: { hash: { _ilike: $keyword } } }
        ) {
          block {
            height
            hash
          }
          reward
          miner {
            id
          }
          timestamp
        }
        errorEvents: error_event(
          limit: $limit
          where: {
            _or: [
              { error_type: { _ilike: $keyword } }
              { error_name: { _ilike: $keyword } }
            ]
          }
        ) {
          extrinsic {
            id
            pallet
            call
          }
        }
      }
    `;

    return {
      query: (keyword: string) =>
        fetcher.graphql<SearchAllResponse>(
          {
            query: getGqlString(SEARCH_ALL),
            variables: getSearchVariables(keyword),
            operationName: 'SearchAll'
          },
          {
            retries: 0
          }
        ),
      useQuery: (
        keyword: string,
        config?: QueryHookOptions<SearchAllResponse>
      ) =>
        useQuery<SearchAllResponse>(SEARCH_ALL, {
          ...config,
          variables: getSearchVariables(keyword)
        })
    };
  }
});
