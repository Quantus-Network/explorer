import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { AccountSorts } from '@/constants/query-sorts';
import { ACCOUNT_SORTS } from '@/constants/query-sorts';
import type { Account, AccountListResponse } from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const accounts = {
  useGetAll: (
    config?: QueryHookOptions<
      AccountListResponse,
      PaginatedQueryVariables<AccountSorts>
    >
  ) => {
    const GET_ACCOUNTS = gql`
      query GetAccounts($limit: Int, $offset: Int, $orderBy: String) {
        accounts(limit: $limit, offset: $offset, orderBy: $orderBy) {
          id
        }
      }
    `;

    return useQuery<AccountListResponse, PaginatedQueryVariables<AccountSorts>>(
      GET_ACCOUNTS,
      {
        ...config,
        variables: {
          orderBy: config?.variables?.orderBy ?? ACCOUNT_SORTS.id.DESC,
          limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
          offset: config?.variables?.offset ?? 0
        }
      }
    );
  },
  useGetById: (id: string, config?: QueryHookOptions<Account>) => {
    const GET_ACCOUNT = gql`
      query GetAccountById($id: String) {
        accountById(id: $id) {
          id
        }
      }
    `;

    return useQuery<Account>(GET_ACCOUNT, {
      ...config,
      variables: {
        id
      }
    });
  }
};
