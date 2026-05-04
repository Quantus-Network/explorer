import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Cancelled_Reversible_Transfer_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { CancelledReversibleTransactionSorts } from '@/constants/query-sorts';
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
        Cancelled_Reversible_Transfer_Bool_Exp
      >
    >
  ) => {
    const GET_CANCELLED_REVERSIBLE_TRANSACTIONS = gql`
      query GetCancelledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [cancelled_reversible_transfer_order_by!]
        $where: cancelled_reversible_transfer_bool_exp
      ) {
        cancelledReversibleTransactions: cancelled_reversible_transfer(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          timestamp
          tx_id
          block {
            height
          }
          cancelledBy {
            id
          }
          scheduledTransfer {
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
        meta: cancelled_reversible_transfer_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<
      CancelledReversibleTransactionListResponse,
      PaginatedQueryVariables<
        CancelledReversibleTransactionSorts,
        Cancelled_Reversible_Transfer_Bool_Exp
      >
    >(GET_CANCELLED_REVERSIBLE_TRANSACTIONS, {
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
      QueryHookOptions<RecentCancelledReversibleTransactionsResponse>,
      'variables'
    >
  ) => {
    const GET_RECENT_CANCELLED_REVERSIBLE_TRANSACTIONS = gql`
      query GetRecentCancelledReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [cancelled_reversible_transfer_order_by!]
      ) {
        cancelledReversibleTransactions: cancelled_reversible_transfer(
          limit: $limit
          offset: $offset
          order_by: $orderBy
        ) {
          timestamp
          tx_id
          block {
            height
          }
          cancelledBy {
            id
          }
          scheduledTransfer {
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
      }
    `;

    return useQuery<
      RecentCancelledReversibleTransactionsResponse,
      PaginatedQueryVariables<CancelledReversibleTransactionSorts>
    >(GET_RECENT_CANCELLED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: { timestamp: 'desc' },
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
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: cancelled_reversible_transfer_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_cancelled_transfers
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
      query GetCancelledReversibleTransactionByTxId($tx_id: String!) {
        cancelledReversibleTransactions: cancelled_reversible_transfer(
          where: { tx_id: { _eq: $tx_id } }
        ) {
          timestamp
          tx_id
          block {
            height
          }
          cancelledBy {
            id
          }
          extrinsic {
            id
            pallet
            call
          }
          scheduledTransfer {
            amount
            scheduled_at
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
        tx_id: string,
        config?: QueryHookOptions<CancelledReversibleTransactionResponse>
      ) =>
        useQuery<CancelledReversibleTransactionResponse>(QUERY, {
          ...config,
          variables: {
            tx_id
          }
        })
    };
  }
};
