import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import {
  WORMHOLE_EXTRINSIC_COLUMNS,
  type WormholeExtrinsicRow
} from '@/components/common/table-columns/WORMHOLE_OUTPUT_COLUMNS';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { type WormholeExtrinsicSorts } from '@/constants/query-sorts';
import { useOrderBy } from '@/hooks/useOrderBy';
import { useTableState } from '@/hooks/useTableState';
import { transformSortLiteral } from '@/utils/transform-sort';

export const WormholeOutputsTable = () => {
  const api = useApiClient();
  const {
    orderBy,
    limit,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue
  } = useTableState('timestamp:desc', QUERY_DEFAULT_LIMIT);

  const orderByObject = useOrderBy<WormholeExtrinsicSorts>(
    orderBy ?? 'timestamp:desc'
  );
  const sortingValue = transformSortLiteral(orderBy);

  const { data, loading, error } = api.wormhole.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: orderByObject,
      limit,
      offset: currentPageIndex * limit,
      where: { extrinsic: { id: { _is_null: false } } }
    }
  });

  const rows: WormholeExtrinsicRow[] = useMemo(
    () => data?.wormholeExtrinsics ?? [],
    [data]
  );
  const totalCount = data?.meta?.aggregate?.totalCount ?? 0;

  const table = useReactTable<WormholeExtrinsicRow>({
    data: rows,
    columns: WORMHOLE_EXTRINSIC_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    rowCount: totalCount,
    state: {
      pagination: paginationValue,
      sorting: sortingValue
    },
    onPaginationChange: handleChangePagination,
    onSortingChange: handleChangeSorting
  });

  const getStatus = () => {
    if (loading) return 'loading' as const;
    if (error) return 'error' as const;
    return 'success' as const;
  };

  return (
    <DataTable
      table={table}
      fetch={{
        status: getStatus(),
        errorFallback: error ? <div>Error: {error.message}</div> : undefined
      }}
      withControls
    />
  );
};
