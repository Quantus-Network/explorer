import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { BLOCK_EXECUTED_REVERSIBLE_COLUMNS } from '@/components/common/table-columns/BLOCK_EXECUTED_REVERSIBLE_COLUMNS';
import type {
  BlockExecutedReversibleTransaction,
  BlockResponse
} from '@/schemas';

export const useBlockExecutedReversibleTransactions = (
  query: QueryResult<BlockResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const columns = useMemo(() => BLOCK_EXECUTED_REVERSIBLE_COLUMNS, []);

  const tableData = useMemo(
    () => data?.executedReversibleTransactions?.edges ?? [],
    [data?.executedReversibleTransactions?.edges]
  );

  const table = useReactTable<BlockExecutedReversibleTransaction>({
    data: tableData,
    columns: columns as any,
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
