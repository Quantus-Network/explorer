import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { ACCOUNT_CANCELLED_REVERSIBLE_COLUMNS } from '@/components/common/table-columns/ACCOUNT_CANCELLED_REVERSIBLE_COLUMNS';
import type {
  AccountCancelledReversibleTransaction,
  AccountResponse
} from '@/schemas';

export const useAccountCancelledReversibleTransactions = (
  query: QueryResult<AccountResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const columns = useMemo(() => ACCOUNT_CANCELLED_REVERSIBLE_COLUMNS, []);

  const tableData = useMemo(
    () => data?.cancelledReversibleTransactions?.edges ?? [],
    [data?.cancelledReversibleTransactions?.edges]
  );

  const table = useReactTable<AccountCancelledReversibleTransaction>({
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
