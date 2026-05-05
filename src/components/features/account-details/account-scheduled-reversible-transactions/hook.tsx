import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { ACCOUNT_SCHEDULED_REVERSIBLE_COLUMNS } from '@/components/common/table-columns/ACCOUNT_SCHEDULED_REVERSIBLE_COLUMNS';
import type {
  AccountResponse,
  AccountScheduledReversibleTransaction
} from '@/schemas';

export const useAccountScheduledReversibleTransactions = (
  query: QueryResult<AccountResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const columns = useMemo(() => ACCOUNT_SCHEDULED_REVERSIBLE_COLUMNS, []);

  const tableData = useMemo(
    () => data?.scheduledReversibleTransactions?.edges ?? [],
    [data?.scheduledReversibleTransactions?.edges]
  );

  const table = useReactTable<AccountScheduledReversibleTransaction>({
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
