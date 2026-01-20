import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { ACCOUNT_GUARDIAN_COLUMNS } from '@/components/common/table-columns/ACCOUNT_GUARDIAN_COLUMNS';
import type { AccountGuardian, AccountResponse } from '@/schemas';

export const useAccountGuardian = (query: QueryResult<AccountResponse>) => {
  const { data, error: fetchError, loading } = query;
  const guardianColumns = useMemo(() => ACCOUNT_GUARDIAN_COLUMNS, []);

  const tableData = useMemo(
    () => data?.guardian?.edges ?? [],
    [data?.guardian?.edges]
  );

  const table = useReactTable<AccountGuardian>({
    data: tableData,
    columns: guardianColumns,
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
