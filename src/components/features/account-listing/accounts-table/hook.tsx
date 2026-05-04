import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { ACCOUNT_COLUMNS } from '@/components/common/table-columns/ACCOUNT_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { AccountSorts } from '@/constants/query-sorts';
import { useOrderBy } from '@/hooks/useOrderBy';
import { useTableState } from '@/hooks/useTableState';
import type { Account } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useAccountsTable = () => {
  const api = useApiClient();
  const {
    orderBy,
    limit,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue
  } = useTableState('last_updated:desc', QUERY_DEFAULT_LIMIT);

  const orderByObject = useOrderBy<AccountSorts>(
    orderBy ?? 'last_updated:desc'
  );
  const sortingValue = transformSortLiteral(orderBy);

  const {
    loading,
    data,
    error: fetchError
  } = api.accounts.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: orderByObject,
      limit,
      offset: currentPageIndex * limit
    }
  });
  const accountColumns = useMemo(() => ACCOUNT_COLUMNS, []);
  const [rowCount, setRowCount] = useState<number>(data?.meta.totalCount ?? 0);

  const table = useReactTable<Account>({
    data: data?.accounts ?? [],
    columns: accountColumns,
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
    if (!loading && data?.meta.totalCount) setRowCount(data.meta.totalCount);
  }, [loading, data?.meta.totalCount]);

  return {
    table,
    getStatus,
    error
  };
};
