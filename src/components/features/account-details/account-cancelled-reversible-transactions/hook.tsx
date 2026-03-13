import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { CANCELLED_REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/CANCELLED_REVERSIBLE_TRANSACTION_COLUMNS';
import type {
  AccountResponse,
  CancelledReversibleTransaction
} from '@/schemas';

export const useAccountCancelledReversibleTransactions = (
  query: QueryResult<AccountResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const columns = useMemo(() => CANCELLED_REVERSIBLE_TRANSACTION_COLUMNS, []);

  const tableData = useMemo(
    () => data?.cancelledReversibleTransactions?.edges.map((e) => e.node) ?? [],
    [data?.cancelledReversibleTransactions?.edges]
  );

  const table = useReactTable<CancelledReversibleTransaction>({
    data: tableData,
    columns,
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
