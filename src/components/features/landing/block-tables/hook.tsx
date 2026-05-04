import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { BLOCK_COLUMNS } from '@/components/common/table-columns/BLOCK_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { BlockSorts } from '@/constants/query-sorts';
import { useOrderBy } from '@/hooks/useOrderBy';
import { useTableState } from '@/hooks/useTableState';
import type { Block } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useBlocksTable = () => {
  const api = useApiClient();
  const {
    orderBy,
    limit,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue
  } = useTableState('timestamp:desc');

  const orderByObject = useOrderBy<BlockSorts>(orderBy ?? 'timestamp:desc');
  const sortingValue = transformSortLiteral(orderBy);

  const {
    loading,
    data,
    error: fetchError
  } = api.blocks.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: orderByObject,
      limit,
      offset: currentPageIndex * limit
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
    onSortingChange: handleChangeSorting,
    onPaginationChange: handleChangePagination,
    rowCount: data?.meta?.totalCount ?? 0,
    manualPagination: true,
    manualSorting: true
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
