import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { RECENT_BLOCK_COLUMNS } from '@/components/common/table-columns/RECENT_BLOCK_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { Block } from '@/schemas';

export const useBlocksTable = () => {
  const api = useApiClient();
  const {
    loading,
    data,
    error: fetchError
  } = api.blocks.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      limit: QUERY_RECENT_LIMIT
    }
  });

  const blockColumns = useMemo(() => RECENT_BLOCK_COLUMNS, []);

  const table = useReactTable<Block>({
    data: data?.blocks ?? [],
    columns: blockColumns,
    state: {
      pagination: { pageSize: QUERY_RECENT_LIMIT, pageIndex: 0 }
    },
    getCoreRowModel: getCoreRowModel(),
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
