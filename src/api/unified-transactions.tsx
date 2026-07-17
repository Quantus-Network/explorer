import type { QueryHookOptions } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';

import type { Unified_Transaction_Bool_Exp } from '@/__generated__/graphql';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { UnifiedListTransactionSorts } from '@/constants/query-sorts';
import type {
  RecentUnifiedListTransactionsResponse,
  UnifiedListTransactionListResponse,
  UnifiedListTransactionsStatsResponse
} from '@/schemas';
import type { PaginatedQueryVariables } from '@/types/query';
import { useGetRecentDateRange } from '@/utils/get-recent-date-range';
import { EXCLUDE_REWARD_TRANSFERS } from '@/utils/unified-transaction-filters';

export const unifiedTransactions = {
  useGetAll: (
    config?: QueryHookOptions<
      UnifiedListTransactionListResponse,
      PaginatedQueryVariables<
        UnifiedListTransactionSorts,
        Unified_Transaction_Bool_Exp
      >
    >
  ) => {
    const GET_UNIFIED_TRANSACTIONS = gql`
      query GetUnifiedTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [unified_transaction_order_by!]
        $where: unified_transaction_bool_exp
      ) {
        transactions: unified_transaction(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          id
          type
          hash
          block {
            height
            hash
          }
          timestamp
          amount
          fee
          status
          detail_id
          from {
            id
          }
          to {
            id
          }
        }
        meta: unified_transaction_aggregate(where: $where) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<
      UnifiedListTransactionListResponse,
      PaginatedQueryVariables<
        UnifiedListTransactionSorts,
        Unified_Transaction_Bool_Exp
      >
    >(GET_UNIFIED_TRANSACTIONS, {
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
      QueryHookOptions<RecentUnifiedListTransactionsResponse>,
      'variables'
    >
  ) => {
    const GET_RECENT_UNIFIED_TRANSACTIONS = gql`
      query GetRecentUnifiedTransactions(
        $limit: Int
        $offset: Int
        $orderBy: [unified_transaction_order_by!]
        $where: unified_transaction_bool_exp
      ) {
        transactions: unified_transaction(
          limit: $limit
          offset: $offset
          order_by: $orderBy
          where: $where
        ) {
          id
          type
          hash
          block {
            height
            hash
          }
          timestamp
          amount
          fee
          status
          detail_id
          from {
            id
          }
          to {
            id
          }
        }
      }
    `;

    return useQuery<RecentUnifiedListTransactionsResponse>(
      GET_RECENT_UNIFIED_TRANSACTIONS,
      {
        ...config,
        variables: {
          orderBy: { timestamp: 'desc' },
          limit: QUERY_RECENT_LIMIT,
          where: EXCLUDE_REWARD_TRANSFERS
        }
      }
    );
  },

  useGetStats: (
    config?: Omit<
      QueryHookOptions<UnifiedListTransactionsStatsResponse>,
      'variables'
    >
  ) => {
    const { startDate, endDate } = useGetRecentDateRange();

    const GET_UNIFIED_TRANSACTIONS_STATS = gql`
      query GetUnifiedTransactionsStats(
        $last24HourWhere: unified_transaction_bool_exp!
        $allTimeWhere: unified_transaction_bool_exp!
      ) {
        last24Hour: unified_transaction_aggregate(where: $last24HourWhere) {
          aggregate {
            totalCount: count
          }
        }
        allTime: unified_transaction_aggregate(where: $allTimeWhere) {
          aggregate {
            totalCount: count
          }
        }
      }
    `;

    return useQuery<UnifiedListTransactionsStatsResponse>(
      GET_UNIFIED_TRANSACTIONS_STATS,
      {
        ...config,
        variables: {
          last24HourWhere: {
            _and: [
              EXCLUDE_REWARD_TRANSFERS,
              { timestamp: { _gte: startDate, _lte: endDate } }
            ]
          },
          allTimeWhere: EXCLUDE_REWARD_TRANSFERS
        }
      }
    );
  }
};
