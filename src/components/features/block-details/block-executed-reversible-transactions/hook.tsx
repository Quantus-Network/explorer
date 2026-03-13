import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { EXECUTED_REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/EXECUTED_REVERSIBLE_TRANSACTION_COLUMNS';
import type { BlockResponse, ExecutedReversibleTransaction } from '@/schemas';

export const useBlockExecutedReversibleTransactions = (
  query: QueryResult<BlockResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const columns = useMemo(() => EXECUTED_REVERSIBLE_TRANSACTION_COLUMNS, []);

  const tableData = useMemo(
    () => data?.executedReversibleTransactions?.edges.map((e) => e.node) ?? [],
    [data?.executedReversibleTransactions?.edges]
  );

  const table = useReactTable<ExecutedReversibleTransaction>({
    data: tableData,
    columns,
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
