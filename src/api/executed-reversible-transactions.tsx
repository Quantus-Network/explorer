import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { ExecutedReversibleTransferWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { ExecutedReversibleTransactionSorts } from '@/constants/query-sorts';
import { EXECUTED_REVERSIBLE_TRANSACTION_SORTS } from '@/constants/query-sorts';
import type {
  ExecutedReversibleTransactionListResponse,
  ExecutedReversibleTransactionResponse,
  ExecutedReversibleTransactionsStatsResponse,
  RecentExecutedReversibleTransactionsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const executedReversibleTransactions = {
  useGetAll: (
    config?: QueryHookOptions<
      ExecutedReversibleTransactionListResponse,
      PaginatedQueryVariables<
        ExecutedReversibleTransactionSorts,
        ExecutedReversibleTransferWhereInput
      >
    >
  ) => {
    const GET_EXECUTED_REVERSIBLE_TRANSACTIONS = gql`
      query GetExecutedReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [ExecutedReversibleTransferOrderByInput!]
        $where: ExecutedReversibleTransferWhereInput
      ) {
        executedReversibleTransactions: executedReversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
          where: $where
        ) {
          timestamp
          txId
          block {
            height
          }
          scheduledTransfer {
            extrinsicHash
            amount
            timestamp
            scheduledAt
            txId
            fee
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
        meta: executedReversibleTransfersConnection(
          orderBy: id_ASC
          where: $where
        ) {
          totalCount
        }
      }
    `;

    return useQuery<
      ExecutedReversibleTransactionListResponse,
      PaginatedQueryVariables<
        ExecutedReversibleTransactionSorts,
        ExecutedReversibleTransferWhereInput
      >
    >(GET_EXECUTED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy:
          config?.variables?.orderBy ??
          EXECUTED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetRecent: (
    config?: Omit<
      QueryHookOptions<RecentExecutedReversibleTransactionsResponse>,
      'variables'
    >
  ) => {
    const GET_RECENT_EXECUTED_REVERSIBLE_TRANSACTIONS = gql`
      query GetRecentExecutedReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [ExecutedReversibleTransferOrderByInput!]
      ) {
        executedReversibleTransactions: executedReversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
        ) {
          timestamp
          txId
          block {
            height
          }
          scheduledTransfer {
            extrinsicHash
            amount
            timestamp
            scheduledAt
            txId
            fee
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
      }
    `;

    return useQuery<
      RecentExecutedReversibleTransactionsResponse,
      PaginatedQueryVariables<ExecutedReversibleTransactionSorts>
    >(GET_RECENT_EXECUTED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: EXECUTED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: QUERY_RECENT_LIMIT
      }
    });
  },
  useGetStats: (
    config?: Omit<
      QueryHookOptions<ExecutedReversibleTransactionsStatsResponse>,
      'variables'
    >
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_EXECUTED_REVERSIBLE_TRANSACTIONS_STATS = gql`
      query GetExecutedReversibleTransactionsStats(
        $startDate: DateTime!
        $endDate: DateTime!
      ) {
        last24Hour: executedReversibleTransfersConnection(
          orderBy: id_ASC
          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }
        ) {
          totalCount
        }
        allTime: executedReversibleTransfersConnection(orderBy: id_ASC) {
          totalCount
        }
      }
    `;

    return useQuery<ExecutedReversibleTransactionsStatsResponse>(
      GET_EXECUTED_REVERSIBLE_TRANSACTIONS_STATS,
      {
        ...config,
        variables: {
          startDate,
          endDate
        }
      }
    );
  },
  getByTxId: () => {
    const QUERY = gql`
      query GetExecutedReversibleTransactionByTxId($txId: String!) {
        executedReversibleTransactions: executedReversibleTransfers(
          where: { txId_eq: $txId }
        ) {
          timestamp
          txId
          block {
            height
          }
          scheduledTransfer {
            extrinsicHash
            amount
            timestamp
            scheduledAt
            txId
            fee
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
      }
    `;

    return {
      useQuery: (
        txId: string,
        config?: QueryHookOptions<ExecutedReversibleTransactionResponse>
      ) =>
        useQuery<ExecutedReversibleTransactionResponse>(QUERY, {
          ...config,
          variables: {
            txId
          }
        })
    };
  }
};
