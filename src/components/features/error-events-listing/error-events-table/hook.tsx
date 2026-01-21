import { useSearch } from '@tanstack/react-router';
import type {
  OnChangeFn,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { ERROR_EVENT_COLUMNS } from '@/components/common/table-columns/ERROR_EVENT_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { ErrorEventSorts } from '@/constants/query-sorts';
import { ERROR_EVENT_SORTS_LITERALS } from '@/constants/query-sorts';
import type { ErrorEvent } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useErrorEventsTable = () => {
  const api = useApiClient();
  const { block } = useSearch({
    strict: false
  }) as any;

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(QUERY_DEFAULT_LIMIT)
  );
  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsStringLiteral(ERROR_EVENT_SORTS_LITERALS)
  );

  const currentPageIndex = page - 1;

  const sortingValue: SortingState = transformSortLiteral(sortBy);
  const paginationValue: PaginationState = {
    pageSize: limit,
    pageIndex: currentPageIndex
  };

  const handleChangeSorting: OnChangeFn<SortingState> = (sorting) => {
    if (typeof sorting === 'function') {
      const newValue = sorting(sortingValue);

      if (newValue[0]?.id) {
        const key = newValue[0].id;
        const order = newValue[0].desc ? 'DESC' : 'ASC';

        const newSortBy = `${key}_${order}` as ErrorEventSorts;

        setSortBy(newSortBy);
      } else {
        setSortBy(null);
      }
    } else if (sorting[0]?.id) {
      const key = sorting[0].id;
      const order = sorting[0].desc ? 'DESC' : 'ASC';

      const newSortBy = `${key}_${order}` as ErrorEventSorts;

      setSortBy(newSortBy);
    }
  };

  const handleChangePagination: OnChangeFn<PaginationState> = (pagination) => {
    if (typeof pagination === 'function') {
      const newPagination = pagination(paginationValue);

      setPage(newPagination.pageIndex + 1);
      setLimit(newPagination.pageSize);
    } else {
      setPage(pagination.pageIndex + 1);
      setLimit(pagination.pageSize);
    }
  };

  const {
    loading,
    data,
    error: fetchError
  } = api.errors.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: sortBy,
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
  const [rowCount, setRowCount] = useState<number>(data?.meta.totalCount ?? 0);

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
    if (!loading && data?.meta.totalCount) setRowCount(data.meta.totalCount);
  }, [loading, data?.meta.totalCount]);

  return {
    table,
    getStatus,
    error
  };
};
