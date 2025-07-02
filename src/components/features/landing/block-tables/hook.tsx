import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import api from '@/api';
import { BLOCK_COLUMNS } from '@/components/common/table-columns/BLOCK_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { Block } from '@/schemas';

export const useBlocksTable = () => {
  const {
    loading,
    data,
    error: fetchError
  } = api.blocks.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });
  const blockColumns = useMemo(() => BLOCK_COLUMNS, []);

  const table = useReactTable<Block>({
    data: data?.blocks ?? [],
    columns: blockColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    rowCount: data?.blocks?.length ?? 0,
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
