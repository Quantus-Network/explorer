import type {
  OnChangeFn,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';
import { useMemo } from 'react';

import api from '@/api';
import { BLOCK_COLUMNS } from '@/components/common/table-columns/BLOCK_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { BlockSorts } from '@/constants/query-sorts';
import { BLOCK_SORTS_LITERALS } from '@/constants/query-sorts';
import type { Block } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useBlocksTable = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));
  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(QUERY_DEFAULT_LIMIT)
  );
  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsStringLiteral(BLOCK_SORTS_LITERALS)
  );

  const sortingValue: SortingState = transformSortLiteral(sortBy);
  const paginationValue: PaginationState = {
    pageSize: limit,
    pageIndex: page
  };

  const handleChangeSorting: OnChangeFn<SortingState> = (sorting) => {
    if (typeof sorting === 'function') {
      const newValue = sorting(sortingValue);

      if (newValue[0]?.id) {
        const key = newValue[0].id;
        const order = newValue[0].desc ? 'DESC' : 'ASC';

        const newSortBy = `${key}_${order}` as BlockSorts;

        setSortBy(newSortBy);
      } else {
        setSortBy(null);
      }
    } else if (sorting[0]?.id) {
      const key = sorting[0].id;
      const order = sorting[0].desc ? 'DESC' : 'ASC';

      const newSortBy = `${key}_${order}` as BlockSorts;

      setSortBy(newSortBy);
    }
  };

  const handleChangePagination: OnChangeFn<PaginationState> = (pagination) => {
    if (typeof pagination === 'function') {
      const newPagination = pagination(paginationValue);

      setPage(newPagination.pageIndex);
      setLimit(newPagination.pageSize);
    } else {
      setPage(pagination.pageIndex);
      setLimit(pagination.pageSize);
    }
  };

  const {
    loading,
    data,
    error: fetchError
  } = api.blocks.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: sortBy,
      limit,
      offset: page * limit
    }
  });
  const blockColumns = useMemo(() => BLOCK_COLUMNS, []);

  const table = useReactTable<Block>({
    data: data?.blocks ?? [],
    columns: blockColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortingValue,
      pagination: paginationValue
    },
    rowCount: data?.meta.totalCount ?? 0,
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

  return {
    table,
    getStatus,
    error
  };
};
