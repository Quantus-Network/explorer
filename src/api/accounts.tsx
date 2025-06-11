import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { AccountListResponse } from '@/schemas';

export const accounts = {
  useGetAll: (config?: QueryHookOptions) => {
    const GET_ACCOUNTS = gql`
      query GetAccounts($limit: Int) {
        accounts(limit: $limit) {
          id
        }
      }
    `;

    return useQuery<AccountListResponse>(GET_ACCOUNTS, {
      ...config,
      variables: {
        ...config?.variables,
        limit: config?.variables?.limit ?? 100
      }
    });
  }
};
