import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import fetchClient from '@/config/fetch-client';
import { SEARCH_PREVIEW_RESULTS_LIMIT } from '@/constants/search-preview-results-limit';
import type { SearchAllResponse } from '@/schemas/searchs';
import { getGqlString } from '@/utils/get-gql-string';

export const search = {
  all: () => {
    const SEARCH_ALL = gql`
      query SearchAll($keyword: String, $limit: Int) {
        transactions: transfers(
          limit: $limit
          where: { extrinsicHash_containsInsensitive: $keyword }
        ) {
          extrinsicHash
        }
        accounts(limit: $limit, where: { id_containsInsensitive: $keyword }) {
          id
        }
      }
    `;

    return {
      query: (keyword: string) =>
        fetchClient.graphql<SearchAllResponse>(
          {
            query: getGqlString(SEARCH_ALL),
            variables: {
              keyword
            },
            operationName: 'SearchAll'
          },
          {
            retries: 0
          }
        ),
      useQUery: (
        keyword: string,
        config?: QueryHookOptions<SearchAllResponse>
      ) =>
        useQuery<SearchAllResponse>(SEARCH_ALL, {
          ...config,
          variables: {
            keyword,
            limit: SEARCH_PREVIEW_RESULTS_LIMIT
          }
        })
    };
  }
};
