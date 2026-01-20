import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import { SEARCH_PREVIEW_RESULTS_LIMIT } from '@/constants/search-preview-results-limit';
import type { SearchAllResponse } from '@/schemas';
import type DataFetcher from '@/utils/fetcher';
import { getGqlString } from '@/utils/get-gql-string';

export const search = (fetcher: DataFetcher) => ({
  all: () => {
    const SEARCH_ALL = gql`
      query SearchAll($keyword: String, $keyword_number: Int, $limit: Int) {
        transactions: transfers(
          limit: $limit
          where: { extrinsicHash_startsWith: $keyword }
        ) {
          extrinsicHash
        }
        reversibleTransactions: reversibleTransfers(
          limit: $limit
          where: { extrinsicHash_startsWith: $keyword }
        ) {
          extrinsicHash
        }
        accounts(limit: $limit, where: { id_startsWith: $keyword }) {
          id
        }
        blocks(
          limit: $limit
          where: {
            hash_startsWith: $keyword
            OR: { height_eq: $keyword_number }
          }
        ) {
          height
        }
        highSecuritySets(
          limit: $limit
          where: { extrinsicHash_startsWith: $keyword }
        ) {
          extrinsicHash
        }
        minerRewards(
          limit: $limit
          where: { block: { hash_startsWith: $keyword } }
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
      }
    `;

    return {
      query: (keyword: string) =>
        fetcher.graphql<SearchAllResponse>(
          {
            query: getGqlString(SEARCH_ALL),
            variables: {
              keyword,
              keyword_number: keyword.startsWith('0x')
                ? -1
                : Number(keyword) || -1, // if the result of conversion is NaN, use -1 as fallback.
              limit: SEARCH_PREVIEW_RESULTS_LIMIT
            },
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
          variables: {
            keyword,
            keyword_number: keyword.startsWith('0x')
              ? -1
              : Number(keyword) || -1, // if the result of conversion is NaN, use -1 as fallback.
            limit: SEARCH_PREVIEW_RESULTS_LIMIT
          }
        })
    };
  }
});
