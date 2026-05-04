import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import { endOfToday } from 'date-fns/endOfToday';
import { startOfToday } from 'date-fns/startOfToday';

import type { Executed_Reversible_Transfer_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { ExecutedReversibleTransactionSorts } from '@/constants/query-sorts';
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
        Executed_Reversible_Transfer_Bool_Exp
      >
    >
  ) => {
    const GET_EXECUTED_REVERSIBLE_TRANSACTIONS = gql`
      query GetExecutedReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [executed_reversible_transfer_order_by!]
        $where: executed_reversible_transfer_bool_exp
      ) {
        executedReversibleTransactions: executed_reversible_transfer(
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
        meta: executed_reversible_transfer_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<
      ExecutedReversibleTransactionListResponse,
      PaginatedQueryVariables<
        ExecutedReversibleTransactionSorts,
        Executed_Reversible_Transfer_Bool_Exp
      >
    >(GET_EXECUTED_REVERSIBLE_TRANSACTIONS, {
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
      QueryHookOptions<RecentExecutedReversibleTransactionsResponse>,
      'variables'
    >
  ) => {
    const GET_RECENT_EXECUTED_REVERSIBLE_TRANSACTIONS = gql`
      query GetRecentExecutedReversibleTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [executed_reversible_transfer_order_by!]
      ) {
        executedReversibleTransactions: executed_reversible_transfer(
          limit: $limit
          offset: $offset
          order_by: $orderBy
        ) {
          timestamp
          tx_id
          block {
            height
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
      RecentExecutedReversibleTransactionsResponse,
      PaginatedQueryVariables<ExecutedReversibleTransactionSorts>
    >(GET_RECENT_EXECUTED_REVERSIBLE_TRANSACTIONS, {
      ...config,
      variables: {
        orderBy: { timestamp: 'desc' },
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
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: executed_reversible_transfer_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          total_executed_transfers
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
      query GetExecutedReversibleTransactionByTxId($tx_id: String!) {
        executedReversibleTransactions: executed_reversible_transfer(
          where: { tx_id: { _eq: $tx_id } }
        ) {
          timestamp
          tx_id
          block {
            height
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
        config?: QueryHookOptions<ExecutedReversibleTransactionResponse>
      ) =>
        useQuery<ExecutedReversibleTransactionResponse>(QUERY, {
          ...config,
          variables: {
            tx_id
          }
        })
    };
  }
};
