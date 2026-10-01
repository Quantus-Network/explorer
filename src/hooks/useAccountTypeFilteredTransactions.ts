import { useMemo } from 'react';

import type { Unified_Transaction_Bool_Exp } from '@/__generated__/graphql';
import useApiClient from '@/api';
import type { AccountTypeFilterKey } from '@/constants/account-types';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { UnifiedListTransactionSorts } from '@/constants/query-sorts';
import { useAccountTypeFilters } from '@/hooks/useAccountTypeFilters';
import { accountTypeFilteredTransactionsWhere } from '@/utils/account-type-filter';
import { browsableRowCount } from '@/utils/browsable-page-depth';
import { uncountedRowCount } from '@/utils/uncounted-pagination';
import { withExcludedRewardTransfers } from '@/utils/unified-transaction-filters';

interface Args {
  /** Table-specific filter (account party, block, ...); undefined lists every transaction. */
  baseWhere?: Unified_Transaction_Bool_Exp;
  orderBy?: UnifiedListTransactionSorts;
  limit: number;
  currentPageIndex: number;
  skip: boolean;
}

const TRANSACTION_FILTER_KEYS: readonly AccountTypeFilterKey[] = [
  'from_type',
  'to_type'
];

/**
 * Unified transactions for a table with the sender / receiver account-type filters applied.
 * Unfiltered lists keep their fast precomputed totals; filtered lists page
 * without a total (see `uncounted-pagination.ts`).
 */
export const useAccountTypeFilteredTransactions = ({
  baseWhere,
  orderBy,
  limit,
  currentPageIndex,
  skip
}: Args) => {
  const api = useApiClient();
  const accountTypeFilters = useAccountTypeFilters(TRANSACTION_FILTER_KEYS);
  const { filters } = accountTypeFilters;

  const unfilteredWhere = useMemo(
    () => withExcludedRewardTransfers(baseWhere),
    [baseWhere]
  );
  const filteredWhere = useMemo(
    () =>
      accountTypeFilteredTransactionsWhere(baseWhere, {
        from: filters.from_type,
        to: filters.to_type
      }),
    [baseWhere, filters.from_type, filters.to_type]
  );
  const isFiltered = filteredWhere !== null;

  const variables = {
    orderBy,
    limit,
    offset: currentPageIndex * limit
  };

  const unfiltered = api.unifiedTransactions.useGetAll({
    skip: skip || isFiltered,
    pollInterval: DATA_POOL_INTERVAL,
    variables: { ...variables, where: unfilteredWhere }
  });
  const filtered = api.unifiedTransactions.useGetFiltered({
    skip: skip || !isFiltered,
    pollInterval: DATA_POOL_INTERVAL,
    variables: { ...variables, where: filteredWhere ?? unfilteredWhere }
  });

  let latestRowCount: number | undefined;
  if (isFiltered) {
    latestRowCount = filtered.data
      ? browsableRowCount(
          uncountedRowCount({
            pageIndex: currentPageIndex,
            limit,
            pageRowCount: filtered.data.transactions.length,
            hasNextPage: filtered.data.hasNextPage
          })
        )
      : undefined;
  } else if (unfiltered.data?.meta.aggregate.totalCount != null) {
    latestRowCount = browsableRowCount(
      unfiltered.data.meta.aggregate.totalCount
    );
  }

  const active = isFiltered ? filtered : unfiltered;

  return {
    loading: active.loading,
    error: active.error,
    transactions: active.data?.transactions,
    latestRowCount,
    isFiltered,
    accountTypeFilters
  };
};
