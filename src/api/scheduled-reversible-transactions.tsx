import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { ScheduledReversibleTransferWhereInput } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { ScheduledReversibleTransactionSorts } from '@/constants/query-sorts';
import { SCHEDULED_REVERSIBLE_TRANSACTION_SORTS } from '@/constants/query-sorts';
import type {
  RecentScheduledReversibleTransactionsResponse,
  ScheduledReversibleTransactionListResponse,
  ScheduledReversibleTransactionResponse,
  ScheduledReversibleTransactionsStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';

export const scheduledReversibleTransactions = {
  useGetAll: (
    config?: QueryHookOptions<
      ScheduledReversibleTransactionListResponse,
      PaginatedQueryVariables<
        ScheduledReversibleTransactionSorts,
        ScheduledReversibleTransferWhereInput
      >
    >
  ) => {
    const GET_SCHEDULED_REVERSIBLE_TRANSACTIONS = gql`
      query GetScheduledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [ScheduledReversibleTransferOrderByInput!]
        $where: ScheduledReversibleTransferWhereInput
      ) {
        scheduledReversibleTransactions: scheduledReversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
          where: $where
        ) {
          extrinsic {
            id
            pallet
            call
          }
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
        meta: scheduledReversibleTransfersConnection(
          orderBy: id_ASC
          where: $where
        ) {
          totalCount
        }
      }
    `;

    return useQuery<
      ScheduledReversibleTransactionListResponse,
      PaginatedQueryVariables<
        ScheduledReversibleTransactionSorts,
        ScheduledReversibleTransferWhereInput
      >
    >(GET_SCHEDULED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy:
          config?.variables?.orderBy ??
          SCHEDULED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: config?.variables?.where
      }
    });
  },
  useGetRecent: (
    config?: Omit<
      QueryHookOptions<RecentScheduledReversibleTransactionsResponse>,
      'variables'
    >
  ) => {
    const GET_RECENT_SCHEDULED_REVERSIBLE_TRANSACTIONS = gql`
      query GetRecentScheduledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [ScheduledReversibleTransferOrderByInput!]
      ) {
        scheduledReversibleTransactions: scheduledReversibleTransfers(
          limit: $limit
          offset: $offset
          orderBy: $orderBy
        ) {
          extrinsic {
            id
            pallet
            call
          }
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
    `;

    return useQuery<
      RecentScheduledReversibleTransactionsResponse,
      PaginatedQueryVariables<ScheduledReversibleTransactionSorts>
    >(GET_RECENT_SCHEDULED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: SCHEDULED_REVERSIBLE_TRANSACTION_SORTS.timestamp.DESC,
        limit: QUERY_RECENT_LIMIT
      }
    });
  },
  useGetStats: (
    config?: Omit<
      QueryHookOptions<ScheduledReversibleTransactionsStatsResponse>,
      'variables'
    >
  ) => {
    const startDate = startOfToday().toISOString();
    const endDate = endOfToday().toISOString();

    const GET_SCHEDULED_REVERSIBLE_TRANSACTIONS_STATS = gql`
      query GetScheduledReversibleTransactionsStats(
        $startDate: DateTime!
        $endDate: DateTime!
      ) {
        last24Hour: scheduledReversibleTransfersConnection(
          orderBy: id_ASC
          where: { timestamp_gte: $startDate, timestamp_lte: $endDate }
        ) {
          totalCount
        }
        allTime: scheduledReversibleTransfersConnection(orderBy: id_ASC) {
          totalCount
        }
      }
    `;

    return useQuery<ScheduledReversibleTransactionsStatsResponse>(
      GET_SCHEDULED_REVERSIBLE_TRANSACTIONS_STATS,
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
      query GetScheduledReversibleTransactionByTxId($txId: String!) {
        scheduledReversibleTransactions: scheduledReversibleTransfers(
          where: { txId_eq: $txId }
        ) {
          extrinsic {
            id
            pallet
            call
          }
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
    `;

    return {
      useQuery: (
        txId: string,
        config?: QueryHookOptions<ScheduledReversibleTransactionResponse>
      ) =>
        useQuery<ScheduledReversibleTransactionResponse>(QUERY, {
          ...config,
          variables: {
            txId
          }
        })
    };
  }
};
