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
import {
  type ChainTransferTotals,
  sumChainTransferTotals
} from '@/utils/sum-chain-transfer-totals';
import {
  EXCLUDE_REWARD_TRANSFERS,
  extractAccountPartyId,
  isUnfilteredExcludeRewards,
  withExcludedRewardTransfers
} from '@/utils/unified-transaction-filters';

export { isUnfilteredExcludeRewards } from '@/utils/unified-transaction-filters';

const UNIFIED_TX_FIELDS = `
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
`;

const TRANSFER_TOTAL_FIELDS = `
  total_immediate_transfers
  total_scheduled_transfers
  total_executed_transfers
  total_cancelled_transfers
`;

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
      ${UNIFIED_TX_FIELDS}
    }
    meta: unified_transaction_aggregate(where: $where) {
      aggregate {
        totalCount: count
      }
    }
  }
`;

/** Unfiltered list: total from O(1) chain_stats sum instead of full-table aggregate. */
const GET_UNIFIED_TRANSACTIONS_WITH_CHAIN_TOTAL = gql`
  query GetUnifiedTransactionsWithChainTotal(
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
      ${UNIFIED_TX_FIELDS}
    }
    meta: chain_stats_by_pk(id: "global") {
      ${TRANSFER_TOTAL_FIELDS}
    }
  }
`;

/** Account party list: total from O(1) account_stats sum instead of filtered aggregate. */
const GET_UNIFIED_TRANSACTIONS_WITH_ACCOUNT_TOTAL = gql`
  query GetUnifiedTransactionsWithAccountTotal(
    $limit: Int
    $offset: Int
    $orderBy: [unified_transaction_order_by!]
    $where: unified_transaction_bool_exp
    $accountId: String!
  ) {
    transactions: unified_transaction(
      limit: $limit
      offset: $offset
      order_by: $orderBy
      where: $where
    ) {
      ${UNIFIED_TX_FIELDS}
    }
    meta: account_stats_by_pk(id: $accountId) {
      ${TRANSFER_TOTAL_FIELDS}
    }
  }
`;

type StatsTotalListResponse = {
  transactions: UnifiedListTransactionListResponse['transactions'];
  meta: ChainTransferTotals | null;
};

function documentForListTotals(options: {
  useChainTotal: boolean;
  useAccountTotal: boolean;
}) {
  if (options.useChainTotal) {
    return GET_UNIFIED_TRANSACTIONS_WITH_CHAIN_TOTAL;
  }
  if (options.useAccountTotal) {
    return GET_UNIFIED_TRANSACTIONS_WITH_ACCOUNT_TOTAL;
  }
  return GET_UNIFIED_TRANSACTIONS;
}

function normalizeListResponse(
  data: UnifiedListTransactionListResponse | StatsTotalListResponse | undefined
): UnifiedListTransactionListResponse | undefined {
  if (!data) return undefined;
  const meta = data.meta as
    | UnifiedListTransactionListResponse['meta']
    | ChainTransferTotals
    | null
    | undefined;
  if (meta && 'aggregate' in meta) {
    return data as UnifiedListTransactionListResponse;
  }
  return {
    transactions: data.transactions,
    meta: {
      aggregate: {
        totalCount: sumChainTransferTotals(meta as ChainTransferTotals | null)
      }
    }
  };
}

export const unifiedTransactions = {
  useGetAll: (
    config?: QueryHookOptions<
      UnifiedListTransactionListResponse,
      PaginatedQueryVariables<
        UnifiedListTransactionSorts,
        Unified_Transaction_Bool_Exp
      > & { accountId?: string }
    >
  ) => {
    const where = config?.variables?.where;
    const accountId = extractAccountPartyId(where);
    const useChainTotal = isUnfilteredExcludeRewards(where);
    const useAccountTotal = !useChainTotal && !!accountId;

    const document = documentForListTotals({ useChainTotal, useAccountTotal });

    const result = useQuery(document, {
      ...config,
      variables: {
        orderBy: config?.variables?.orderBy ?? { timestamp: 'desc' },
        limit: config?.variables?.limit ?? QUERY_DEFAULT_LIMIT,
        offset: config?.variables?.offset ?? 0,
        where: where ?? EXCLUDE_REWARD_TRANSFERS,
        ...(useAccountTotal ? { accountId } : {})
      }
    });

    return {
      ...result,
      data: normalizeListResponse(
        result.data as
          | UnifiedListTransactionListResponse
          | StatsTotalListResponse
          | undefined
      )
    };
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
          ${UNIFIED_TX_FIELDS}
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
      ) {
        last24Hour: unified_transaction_aggregate(where: $last24HourWhere) {
          aggregate {
            totalCount: count
          }
        }
        allTime: chain_stats_by_pk(id: "global") {
          ${TRANSFER_TOTAL_FIELDS}
        }
      }
    `;

    type StatsRaw = {
      last24Hour: UnifiedListTransactionsStatsResponse['last24Hour'];
      allTime: ChainTransferTotals | null;
    };

    const result = useQuery<StatsRaw>(GET_UNIFIED_TRANSACTIONS_STATS, {
      ...(config as QueryHookOptions<StatsRaw> | undefined),
      variables: {
        last24HourWhere: withExcludedRewardTransfers({
          timestamp: { _gte: startDate, _lte: endDate }
        })
      }
    });

    const data: UnifiedListTransactionsStatsResponse | undefined = result.data
      ? {
          last24Hour: result.data.last24Hour,
          allTime: {
            aggregate: {
              totalCount: sumChainTransferTotals(result.data.allTime)
            }
          }
        }
      : undefined;

    return {
      ...result,
      data
    };
  }
};
