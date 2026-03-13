import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { SCHEDULED_REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/SCHEDULED_REVERSIBLE_TRANSACTION_COLUMNS';
import type {
  AccountResponse,
  ScheduledReversibleTransaction
} from '@/schemas';

export const useAccountScheduledReversibleTransactions = (
  query: QueryResult<AccountResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const columns = useMemo(() => {
    return SCHEDULED_REVERSIBLE_TRANSACTION_COLUMNS.map((col) => ({
      ...col,
      accessorKey: col.id === 'tx-hash' ? 'extrinsicHash' : col.id
    }));
  }, []);

  const tableData = useMemo(
    () => data?.scheduledReversibleTransactions?.edges.map((e) => e.node) ?? [],
    [data?.scheduledReversibleTransactions?.edges]
  );

  const table = useReactTable<ScheduledReversibleTransaction>({
    data: tableData,
    columns: columns as any,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false
  });

  const success = !loading && !fetchError;
  const error = !loading && fetchError;

  const getStatus = useCallback(() => {
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
  }, [success, error, loading]);

  return {
    table,
    getStatus,
    error
  };
};
