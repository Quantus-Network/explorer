import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import fetchClient from '@/config/fetch-client';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { TransactionSorts } from '@/constants/query-sorts';
import { TRANSACTION_SORTS } from '@/constants/query-sorts';
import type {
  RecentTransactionsResponse,
  TransactionListResponse,
  TransactionResponse,
  TransactionsStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { getGqlString } from '@/utils/get-gql-string';

export const transactions = {
  useGetAll: (
    config?: QueryHookOptions<
      TransactionListResponse,
      PaginatedQueryVariables<TransactionSorts>
    >
  ) => {
    const GET_TRANSACTIONS = gql`
      query GetTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [TransferOrderByInput!]
      ) {
        transactions: transfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
        ) {
          id
          fee
          extrinsicHash
          blockNumber
          amount
          timestamp
          from {
            id
          }
          to {
            id
          }
        }
        meta: transfersConnection(orderBy: id_ASC) {
          totalCount
        }
      }
    `;

    return useQuery<
      TransactionListResponse,
      PaginatedQueryVariables<TransactionSorts>
    >(GET_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? TRANSACTION_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0
      }
    });
  },
  useGetRecent: (
    config?: Omit<QueryHookOptions<RecentTransactionsResponse>, 'variables'>
  ) => {
    const GET_RECENT_TRANSACTIONS = gql`
      query GetRecentTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [TransferOrderByInput!]
      ) {
        transactions: transfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
        ) {
          id
          fee
          extrinsicHash
          blockNumber
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
    `;

    return useQuery<
      RecentTransactionsResponse,
      PaginatedQueryVariables<TransactionSorts>
    >(GET_RECENT_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: TRANSACTION_SORTS.timestamp.DESC,
        limit: 10
      }
    });
  },
  // TODO: need to update subsquid to properly get the resource needed
  useGetStats: (
    config?: Omit<QueryHookOptions<TransactionsStatsResponse>, 'variables'>
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_TRANSACTIONS_STATS = gql`
      query GetTransactionsStats($startDate: DateTime!, $endDate: DateTime!) {
        transactions: transfers(
          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }
        ) {
          fee
          amount
        }
      }
    `;

    return useQuery<TransactionsStatsResponse>(GET_TRANSACTIONS_STATS, {
      ...config,
      variables: {
        startDate,
        endDate
      }
    });
  },
  getById: () => {
    const GET_TRANSACTION = gql`
      query GetTransactionById($id: String!) {
        transaction: transferById(id: $id) {
          id
          fee
          extrinsicHash
          blockNumber
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
    `;

    return {
      query: (id: string) =>
        fetchClient.graphql<TransactionResponse>(
          {
            query: getGqlString(GET_TRANSACTION),
            variables: {
              id
            },
            operationName: 'GetTransactionById'
          },
          {
            retries: 0
          }
        ),
      useQuery: (id: string, config?: QueryHookOptions<TransactionResponse>) =>
        useQuery<TransactionResponse>(GET_TRANSACTION, {
          ...config,
          variables: {
            id
          }
        })
    };
  }
};
