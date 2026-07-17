import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { UNIFIED_LIST_TRANSACTION_COLUMNS } from '@/components/common/table-columns/UNIFIED_LIST_TRANSACTION_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { UnifiedListTransactionSorts } from '@/constants/query-sorts';
import { useOrderBy } from '@/hooks/useOrderBy';
import { useTableState } from '@/hooks/useTableState';
import type { UnifiedListTransaction } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';
import { withExcludedRewardTransfers } from '@/utils/unified-transaction-filters';

export const useMultisigDetailTransactions = (walletId: string) => {
  const api = useApiClient();

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

  const where = useMemo(
    () =>
      withExcludedRewardTransfers({
        _or: [
          { from: { id: { _eq: walletId } } },
          { to: { id: { _eq: walletId } } }
        ]
      }),
    [walletId]
  );

  const {
    loading,
    data,
    error: fetchError
  } = api.unifiedTransactions.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: orderByObject,
      limit,
      offset: currentPageIndex * limit,
      where
    }
  });

  const transactionColumns = useMemo(
    () => UNIFIED_LIST_TRANSACTION_COLUMNS,
    []
  );
  const [rowCount, setRowCount] = useState<number>(
    data?.meta.aggregate.totalCount ?? 0
  );

  const table = useReactTable<UnifiedListTransaction>({
    data: data?.transactions ?? [],
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortingValue,
      pagination: paginationValue
    },
    rowCount,
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
    if (!loading && data?.meta.aggregate.totalCount != null)
      setRowCount(data.meta.aggregate.totalCount);
  }, [loading, data?.meta.aggregate.totalCount]);

  return {
    table,
    getStatus,
    error: fetchError
  };
};
