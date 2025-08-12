import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { ACCOUNT_MINER_REWARDS_COLUMNS } from '@/components/common/table-columns/ACCOUNT_MINER_REWARDS_COLUMNS';
import type { AccountMinerRewards, AccountResponse } from '@/schemas';

export const useAccountMinerRewards = (query: QueryResult<AccountResponse>) => {
  const { data, error: fetchError, loading } = query;
  const minerRewardColumns = useMemo(() => ACCOUNT_MINER_REWARDS_COLUMNS, []);

  const table = useReactTable<AccountMinerRewards>({
    data: data?.minerRewards?.edges ?? [],
    columns: minerRewardColumns,
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
