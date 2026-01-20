import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { ACCOUNT_BENEFICIARIES_COLUMNS } from '@/components/common/table-columns/ACCOUNT_BENEFICIARIES_COLUMNS';
import type { AccountBeneficiary, AccountResponse } from '@/schemas';

export const useAccountBeneficiaries = (
  query: QueryResult<AccountResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const beneficiariesColumns = useMemo(() => ACCOUNT_BENEFICIARIES_COLUMNS, []);

  const tableData = useMemo(
    () => data?.beneficiaries?.edges ?? [],
    [data?.beneficiaries?.edges]
  );

  const table = useReactTable<AccountBeneficiary>({
    data: tableData,
    columns: beneficiariesColumns,
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
