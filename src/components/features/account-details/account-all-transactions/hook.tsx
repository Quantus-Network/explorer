import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import { createAccountUnifiedTransactionColumns } from '@/components/common/table-columns/UNIFIED_LIST_TRANSACTION_COLUMNS';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { UnifiedListTransactionSorts } from '@/constants/query-sorts';
import { useAccountTypeFilteredTransactions } from '@/hooks/useAccountTypeFilteredTransactions';
import { useBrowsablePageDepth } from '@/hooks/useBrowsablePageDepth';
import { useOrderBy } from '@/hooks/useOrderBy';
import { useTableState } from '@/hooks/useTableState';
import type { UnifiedListTransaction } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';
import { accountPartyWhere } from '@/utils/unified-transaction-filters';

export const useAccountAllTransactions = (accountId: string) => {
  const {
    orderBy,
    limit,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue
  } = useTableState(null, QUERY_DEFAULT_LIMIT);

  const orderByObject = useOrderBy<UnifiedListTransactionSorts>(orderBy ?? '');
  const sortingValue = transformSortLiteral(orderBy);
  const { beyondDepth } = useBrowsablePageDepth({
    currentPageIndex,
    limit,
    handleChangePagination
  });

  const baseWhere = useMemo(() => accountPartyWhere(accountId), [accountId]);

  const {
    loading,
    error: fetchError,
    transactions,
    latestRowCount,
    isFiltered,
    accountTypeFilters
  } = useAccountTypeFilteredTransactions({
    baseWhere,
    orderBy: orderByObject,
    limit,
    currentPageIndex,
    skip: beyondDepth
  });

  const transactionColumns = useMemo(
    () => createAccountUnifiedTransactionColumns(accountId),
    [accountId]
  );
  const [rowCount, setRowCount] = useState<number>(latestRowCount ?? 0);

  const table = useReactTable<UnifiedListTransaction>({
    data: transactions ?? [],
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortingValue,
      pagination: paginationValue
    },
    rowCount,
    meta: { totalCountUnknown: isFiltered },
    onSortingChange: handleChangeSorting,
    onPaginationChange: handleChangePagination,
    manualSorting: true,
    manualPagination: true
  });

  const success = !loading && !fetchError;
  const error = !loading && fetchError;

  const getStatus = () => {
    switch (true) {
      case success:
        return 'success';
      case !!error:
        return 'error';
      case !!loading:
        return 'loading';
      default:
        return 'idle';
    }
  };

  useEffect(() => {
    if (!loading && latestRowCount != null) setRowCount(latestRowCount);
  }, [loading, latestRowCount]);

  return {
    table,
    getStatus,
    error: fetchError,
    isFiltered,
    accountTypeFilters
  };
};
