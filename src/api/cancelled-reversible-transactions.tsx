import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { CancelledReversibleTransferWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { CancelledReversibleTransactionSorts } from '@/constants/query-sorts';
import { CANCELLED_REVERSIBLE_TRANSACTION_SORTS } from '@/constants/query-sorts';
import type {
  CancelledReversibleTransactionListResponse,
  CancelledReversibleTransactionResponse,
  CancelledReversibleTransactionsStatsResponse,
  RecentCancelledReversibleTransactionsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const cancelledReversibleTransactions = {
  useGetAll: (
    config?: QueryHookOptions<
      CancelledReversibleTransactionListResponse,
      PaginatedQueryVariables<
        CancelledReversibleTransactionSorts,
        CancelledReversibleTransferWhereInput
      >
    >
  ) => {
    const GET_CANCELLED_REVERSIBLE_TRANSACTIONS = gql`
      query GetCancelledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [CancelledReversibleTransferOrderByInput!]
        $where: CancelledReversibleTransferWhereInput
      ) {
        cancelledReversibleTransactions: cancelledReversibleTransfers(
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
          cancelledBy {
            id
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
        meta: cancelledReversibleTransfersConnection(
          orderBy: id_ASC
          where: $where
        ) {
          totalCount
        }
      }
    `;

    return useQuery<
      CancelledReversibleTransactionListResponse,
      PaginatedQueryVariables<
        CancelledReversibleTransactionSorts,
        CancelledReversibleTransferWhereInput
      >
    >(GET_CANCELLED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy:
          config?.variables?.orderBy ??
          CANCELLED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetRecent: (
    config?: Omit<
      QueryHookOptions<RecentCancelledReversibleTransactionsResponse>,
      'variables'
    >
  ) => {
    const GET_RECENT_CANCELLED_REVERSIBLE_TRANSACTIONS = gql`
      query GetRecentCancelledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [CancelledReversibleTransferOrderByInput!]
      ) {
        cancelledReversibleTransactions: cancelledReversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
        ) {
          timestamp
          txId
          block {
            height
          }
          cancelledBy {
            id
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
      RecentCancelledReversibleTransactionsResponse,
      PaginatedQueryVariables<CancelledReversibleTransactionSorts>
    >(GET_RECENT_CANCELLED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: CANCELLED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: QUERY_RECENT_LIMIT
      }
    });
  },
  useGetStats: (
    config?: Omit<
      QueryHookOptions<CancelledReversibleTransactionsStatsResponse>,
      'variables'
    >
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_CANCELLED_REVERSIBLE_TRANSACTIONS_STATS = gql`
      query GetCancelledReversibleTransactionsStats(
        $startDate: DateTime!
        $endDate: DateTime!
      ) {
        last24Hour: cancelledReversibleTransfersConnection(
          orderBy: id_ASC
          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }
        ) {
          totalCount
        }
        allTime: cancelledReversibleTransfersConnection(orderBy: id_ASC) {
          totalCount
        }
      }
    `;

    return useQuery<CancelledReversibleTransactionsStatsResponse>(
      GET_CANCELLED_REVERSIBLE_TRANSACTIONS_STATS,
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
      query GetCancelledReversibleTransactionByTxId($txId: String!) {
        cancelledReversibleTransactions: cancelledReversibleTransfers(
          where: { txId_eq: $txId }
        ) {
          timestamp
          txId
          block {
            height
          }
          cancelledBy {
            id
          }
          extrinsicHash
          scheduledTransfer {
            amount
            scheduledAt
            fee
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
        config?: QueryHookOptions<CancelledReversibleTransactionResponse>
      ) =>
        useQuery<CancelledReversibleTransactionResponse>(QUERY, {
          ...config,
          variables: {
            txId
          }
        })
    };
  }
};
