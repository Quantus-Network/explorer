import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { BLOCK_HIGH_SECURITY_SET_COLUMNS } from '@/components/common/table-columns/BLOCK_HIGH_SECURITY_SET_COLUMNS';
import type { BlockResponse, BlockHighSecuritySet } from '@/schemas';

export const useBlockHighSecuritySets = (query: QueryResult<BlockResponse>) => {
  const { data, error: fetchError, loading } = query;
  const blockColumns = useMemo(() => BLOCK_HIGH_SECURITY_SET_COLUMNS, []);

  const table = useReactTable<BlockHighSecuritySet>({
    data: data?.highSecuritySets?.edges ?? [],
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
