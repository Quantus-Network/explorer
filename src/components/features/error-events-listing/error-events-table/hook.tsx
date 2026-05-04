import { useSearch } from '@tanstack/react-router';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { ERROR_EVENT_COLUMNS } from '@/components/common/table-columns/ERROR_EVENT_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { ErrorEventSorts } from '@/constants/query-sorts';
import { useOrderBy } from '@/hooks/useOrderBy';
import { useTableState } from '@/hooks/useTableState';
import type { ErrorEvent } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useErrorEventsTable = () => {
  const api = useApiClient();
  const { block } = useSearch({
    strict: false
  }) as any;

  const {
    orderBy,
    limit,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue
  } = useTableState(null, QUERY_DEFAULT_LIMIT);

  const orderByObject = useOrderBy<ErrorEventSorts>(orderBy ?? '');
  const sortingValue = transformSortLiteral(orderBy);

  const {
    loading,
    data,
    error: fetchError
  } = api.errors.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: orderByObject,
      limit,
      offset: currentPageIndex * limit,
      ...(block && {
        where: {
          block: { height_eq: Number(block) }
        }
      })
    }
  });

  const errorEventColumns = useMemo(() => ERROR_EVENT_COLUMNS, []);
  const [rowCount, setRowCount] = useState<number>(
    data?.meta.aggregate.totalCount ?? 0
  );

  const table = useReactTable<ErrorEvent>({
    data: data?.errorEvents ?? [],
    columns: errorEventColumns,
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
    if (!loading && data?.meta.aggregate.totalCount)
      setRowCount(data.meta.aggregate.totalCount);
  }, [loading, data?.meta.aggregate.totalCount]);

  return {
    table,
    getStatus,
    error
  };
};
