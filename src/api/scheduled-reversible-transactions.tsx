import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Scheduled_Reversible_Transfer_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { ScheduledReversibleTransactionSorts } from '@/constants/query-sorts';
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
        Scheduled_Reversible_Transfer_Bool_Exp
      >
    >
  ) => {
    const GET_SCHEDULED_REVERSIBLE_TRANSACTIONS = gql`
      query GetScheduledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [scheduled_reversible_transfer_order_by!]
        $where: Scheduled_Reversible_Transfer_Bool_Exp
      ) {
        scheduledReversibleTransactions: scheduled_reversible_transfer(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          extrinsic {
            id
            pallet
            call
          }
          amount
          timestamp
          scheduled_at
          tx_id
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
        meta: scheduled_reversible_transfer_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<
      ScheduledReversibleTransactionListResponse,
      PaginatedQueryVariables<
        ScheduledReversibleTransactionSorts,
        Scheduled_Reversible_Transfer_Bool_Exp
      >
    >(GET_SCHEDULED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? { timestamp: 'desc' },
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
        $orderBy: [scheduled_reversible_transfer_order_by!]
      ) {
        scheduledReversibleTransactions: scheduled_reversible_transfer(
          limit: $limit
          offset: $offset
          order_by: $orderBy
        ) {
          extrinsic {
            id
            pallet
            call
          }
          amount
          timestamp
          scheduled_at
          tx_id
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
        orderBy: { timestamp: 'desc' },
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
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: scheduled_reversible_transfer_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats {
          totalCount: total_scheduled_transfers
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
      query GetScheduledReversibleTransactionByTxId($tx_id: String!) {
        scheduledReversibleTransactions: scheduled_reversible_transfer(
          where: { tx_id: { _eq: $tx_id } }
        ) {
          extrinsic {
            id
            pallet
            call
          }
          amount
          timestamp
          scheduled_at
          tx_id
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
        tx_id: string,
        config?: QueryHookOptions<ScheduledReversibleTransactionResponse>
      ) =>
        useQuery<ScheduledReversibleTransactionResponse>(QUERY, {
          ...config,
          variables: {
            tx_id
          }
        })
    };
  }
};
