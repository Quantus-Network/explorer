import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';

import { ACCOUNT_MINER_REWARDS_COLUMNS } from '@/components/common/table-columns/ACCOUNT_MINER_REWARDS_COLUMNS';
import type { AccountMinerRewards, AccountResponse } from '@/schemas';

export const useAccountMinerRewards = (query: QueryResult<AccountResponse>) => {
  const { data, error: fetchError, loading } = query;
  const minerRewardColumns = useMemo(() => ACCOUNT_MINER_REWARDS_COLUMNS, []);

  const tableData = useMemo(
    () => data?.minerRewards?.edges ?? [],
    [data?.minerRewards?.edges]
  );

  const table = useReactTable<AccountMinerRewards>({
    data: tableData,
    columns: minerRewardColumns,
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
