import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { ACCOUNT_TRANSACTION_COLUMNS } from '@/components/common/table-columns/ACCOUNT_TRANSACTION_COLUMNS';
import type { AccountResponse, AccountTransaction } from '@/schemas';

export const useAccountTransactions = (query: QueryResult<AccountResponse>) => {
  const { data, error: fetchError, loading } = query;
  const transactionColumns = useMemo(() => ACCOUNT_TRANSACTION_COLUMNS, []);

  const table = useReactTable<AccountTransaction>({
    data: data?.transactions?.edges ?? [],
    columns: transactionColumns,
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
