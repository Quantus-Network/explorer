import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import fetchClient from '@/config/fetch-client';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { AccountSorts } from '@/constants/query-sorts';
import { ACCOUNT_SORTS } from '@/constants/query-sorts';
import type { AccountListResponse, AccountResponse } from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { getGqlString } from '@/utils/get-gql-string';

export const accounts = {
  useGetAll: (
    config?: QueryHookOptions<
      AccountListResponse,
      PaginatedQueryVariables<AccountSorts>
    >
  ) => {
    const GET_ACCOUNTS = gql`
      query GetAccounts(
        $limit: Int
        $offset: Int
        $orderBy: [AccountOrderByInput!]
      ) {
        accounts(limit: $limit, offset: $offset, orderBy: $orderBy) {
          id
          free
          frozen
          reserved
        }
        meta: accountsConnection(orderBy: id_ASC) {
          totalCount
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
  getById: () => {
    const GET_ACCOUNT = gql`
      query GetAccountById($id: String!, $limit: Int!) {
        account: accountById(id: $id) {
          id
          free
          frozen
          reserved
        }
        transactions: transfersConnection(
          orderBy: timestamp_DESC
          first: $limit
          where: {
            extrinsicHash_isNull: false
            AND: { from: { id_eq: $id }, OR: { to: { id_eq: $id } } }
          }
        ) {
          edges {
            node {
              fee
              extrinsicHash
              block {
                height
              }
              amount
              timestamp
              from {
                id
              }
              to {
                id
              }
            }
          }

          totalCount
        }
        reversibleTransactions: reversibleTransfersConnection(
          orderBy: timestamp_DESC
          first: $limit
          where: { from: { id_eq: $id }, OR: { to: { id_eq: $id } } }
        ) {
          edges {
            node {
              extrinsicHash
              scheduledAt
              timestamp
              status
              block {
                height
              }
              from {
                id
              }
              to {
                id
              }
            }
          }

          totalCount
        }
      }
    `;

    return {
      query: (id: string) =>
        fetchClient.graphql<AccountResponse>(
          {
            query: getGqlString(GET_ACCOUNT),
            variables: {
              id,
              limit: QUERY_DEFAULT_LIMIT
            },
            operationName: 'GetAccountById'
          },
          {
            retries: 0
          }
        ),
      useQuery: (id: string, config?: QueryHookOptions<AccountResponse>) =>
        useQuery<AccountResponse>(GET_ACCOUNT, {
          ...config,
          variables: {
            id,
            limit: QUERY_DEFAULT_LIMIT
          }
        })
    };
  }
};
