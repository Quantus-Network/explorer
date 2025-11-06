import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { MINER_REWARD_COLUMNS } from '@/components/common/table-columns/MINER_REWARD_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { MinerReward } from '@/schemas';

export const useMinerRewardsTable = () => {
  const api = useApiClient();
  const {
    loading,
    data,
    error: fetchError
  } = api.minerRewards.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });
  const minerRewardColumns = useMemo(() => MINER_REWARD_COLUMNS, []);

  const table = useReactTable<MinerReward>({
    data: data?.minerRewards ?? [],
    columns: minerRewardColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    rowCount: data?.minerRewards?.length ?? 0,
    manualPagination: true,
    manualSorting: true
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
