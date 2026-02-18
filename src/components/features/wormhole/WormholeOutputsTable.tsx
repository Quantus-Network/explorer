import { useMemo } from 'react';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';

import useApiClient from '@/api';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import {
  WORMHOLE_EXTRINSIC_COLUMNS,
  type WormholeExtrinsicRow
} from '@/components/common/table-columns/WORMHOLE_OUTPUT_COLUMNS';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';

const SORT_OPTIONS = [
  'timestamp_DESC',
  'timestamp_ASC',
  'totalAmount_DESC',
  'totalAmount_ASC'
] as const;

export const WormholeOutputsTable = () => {
  const api = useApiClient();
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(QUERY_DEFAULT_LIMIT)
  );
  const [sortBy] = useQueryState(
    'sortBy',
    parseAsStringLiteral(SORT_OPTIONS).withDefault('timestamp_DESC')
  );

  const offset = (page - 1) * limit;

  const { data, loading, error } = api.wormhole.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: sortBy,
      limit,
      offset,
      where: { extrinsicHash_isNull: false }
    }
  });

  const rows: WormholeExtrinsicRow[] = useMemo(
    () => data?.wormholeExtrinsics ?? [],
    [data]
  );
  const totalCount = data?.meta?.totalCount ?? 0;

  const table = useReactTable<WormholeExtrinsicRow>({
    data: rows,
    columns: WORMHOLE_EXTRINSIC_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / limit),
    state: {
      pagination: { pageIndex: page - 1, pageSize: limit }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const next = updater({ pageIndex: page - 1, pageSize: limit });
        setPage(next.pageIndex + 1);
        setLimit(next.pageSize);
      }
    }
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
