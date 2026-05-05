import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { BLOCK_ERROR_EVENT_COLUMNS } from '@/components/common/table-columns/BLOCK_ERROR_EVENT_COLUMNS';
import type { BlockResponse, BlockErrorEvent } from '@/schemas';

export const useBlockErrorEvents = (query: QueryResult<BlockResponse>) => {
  const { data, error: fetchError, loading } = query;
  const blockColumns = useMemo(() => BLOCK_ERROR_EVENT_COLUMNS, []);

  const table = useReactTable<BlockErrorEvent>({
    data: data?.errorEvents?.edges ?? [],
    columns: blockColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false
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
