import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { ACCOUNT_REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/ACCOUNT_REVERSIBLE_TRANSACTION_COLUMNS';
import type { AccountResponse, AccountReversibleTransaction } from '@/schemas';

export const useAccountReversibleTransactions = (
  query: QueryResult<AccountResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const transactionColumns = useMemo(
    () => ACCOUNT_REVERSIBLE_TRANSACTION_COLUMNS,
    []
  );

  const tableData = useMemo(
    () => data?.reversibleTransactions?.edges ?? [],
    [data?.reversibleTransactions?.edges]
  );

  const table = useReactTable<AccountReversibleTransaction>({
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
