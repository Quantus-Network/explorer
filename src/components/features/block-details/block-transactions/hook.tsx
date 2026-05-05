import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { BLOCK_TRANSACTION_COLUMNS } from '@/components/common/table-columns/BLOCK_TRANSACTION_COLUMNS';
import type { BlockResponse, BlockTransaction } from '@/schemas';

export const useBlockTransactions = (query: QueryResult<BlockResponse>) => {
  const { data, error: fetchError, loading } = query;
  const blockColumns = useMemo(() => BLOCK_TRANSACTION_COLUMNS, []);

  const table = useReactTable<BlockTransaction>({
    data: data?.transactions?.edges ?? [],
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
