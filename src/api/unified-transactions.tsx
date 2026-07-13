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
      ) {
        transactions: unified_transaction(
          limit: $limit
          offset: $offset
          order_by: $orderBy
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
          limit: QUERY_RECENT_LIMIT
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
        $startDate: timestamptz!
        $endDate: timestamptz!
      ) {
        last24Hour: unified_transaction_aggregate(
          where: { timestamp: { _gte: $startDate, _lte: $endDate } }
        ) {
          aggregate {
            totalCount: count
          }
        }
        allTime: unified_transaction_aggregate {
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
          startDate,
          endDate
        }
      }
    );
  }
};
