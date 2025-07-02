import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { TransferWhereInput } from '@/__generated__/graphql';
import fetchClient from '@/config/fetch-client';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
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
      PaginatedQueryVariables<TransactionSorts, TransferWhereInput>
    >
  ) => {
    const GET_TRANSACTIONS = gql`
      query GetTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [TransferOrderByInput!]
        $where: TransferWhereInput
      ) {
        transactions: transfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
          where: $where
        ) {
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
        meta: transfersConnection(orderBy: id_ASC) {
          totalCount
        }
      }
    `;

    return useQuery<
      TransactionListResponse,
      PaginatedQueryVariables<TransactionSorts, TransferWhereInput>
    >(GET_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? TRANSACTION_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
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
    `;

    return useQuery<
      RecentTransactionsResponse,
      PaginatedQueryVariables<TransactionSorts>
    >(GET_RECENT_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: TRANSACTION_SORTS.timestamp.DESC,
        limit: QUERY_RECENT_LIMIT
      }
    });
  },
  useGetStats: (
    config?: Omit<QueryHookOptions<TransactionsStatsResponse>, 'variables'>
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_TRANSACTIONS_STATS = gql`
      query GetTransactionsStats($startDate: DateTime!, $endDate: DateTime!) {
        last24Hour: transfersConnection(
          orderBy: id_ASC
          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }
        ) {
          totalCount
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
  getByHash: () => {
    const QUERY_NAME = 'GetTransactionByHash';
    const QUERY = gql`
      query ${QUERY_NAME}($hash: String!) {
        transactions: transfers(where: { extrinsicHash_eq: $hash }) {
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
    `;

    return {
      query: (hash: string) =>
        fetchClient.graphql<TransactionResponse>(
          {
            query: getGqlString(QUERY),
            variables: {
              hash
            },
            operationName: QUERY_NAME
          },
          {
            retries: 0
          }
        ),
      useQuery: (
        hash: string,
        config?: QueryHookOptions<TransactionResponse>
      ) =>
        useQuery<TransactionResponse>(QUERY, {
          ...config,
          variables: {
            hash
          }
        })
    };
  }
};
