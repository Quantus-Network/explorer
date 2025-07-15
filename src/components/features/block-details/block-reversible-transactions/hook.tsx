import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { BLOCK_REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/BLOCK_REVERSIBLE_TRANSACTION_COLUMNS';
import type { BlockResponse, BlockReversibleTransaction } from '@/schemas';

export const useBlockReversibleTransactions = (
  query: QueryResult<BlockResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const blockColumns = useMemo(() => BLOCK_REVERSIBLE_TRANSACTION_COLUMNS, []);

  const table = useReactTable<BlockReversibleTransaction>({
    data: data?.reversibleTransactions?.edges ?? [],
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
