import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { ACCOUNT_TRANSACTION_COLUMNS } from '@/components/common/table-columns/ACCOUNT_TRANSACTION_COLUMNS';
import type { AccountResponse, AccountTransaction } from '@/schemas';

export const useAccountTransactions = (query: QueryResult<AccountResponse>) => {
  const { data, error: fetchError, loading } = query;
  const transactionColumns = useMemo(() => ACCOUNT_TRANSACTION_COLUMNS, []);

  const tableData = useMemo(
    () => data?.transactions?.edges ?? [],
    [data?.transactions?.edges]
  );

  const table = useReactTable<AccountTransaction>({
    data: tableData,
    columns: transactionColumns,
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
