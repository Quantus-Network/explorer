import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { ACCOUNT_MINER_REWARD_COLUMNS } from '@/components/common/table-columns/MINER_REWARD_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { transformMinerRewardOrderBy } from '@/constants/query-sorts';
import { useTableState } from '@/hooks/useTableState';
import type { MinerReward } from '@/schemas';
import { minerRewardsOfMiner } from '@/utils/miner-reward-filters';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useAccountMinerRewards = (accountId: string) => {
  const api = useApiClient();
  const {
    orderBy,
    limit,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue
  } = useTableState(null, QUERY_DEFAULT_LIMIT);

  const orderByObject = useMemo(
    () => transformMinerRewardOrderBy(orderBy ?? ''),
    [orderBy]
  );
  const sortingValue = transformSortLiteral(orderBy);
  const where = useMemo(() => minerRewardsOfMiner(accountId), [accountId]);

  const {
    loading,
    data,
    error: fetchError
  } = api.minerRewards.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: orderByObject,
      limit,
      offset: currentPageIndex * limit,
      where
    }
  });

  const [rowCount, setRowCount] = useState<number>(
    data?.meta.aggregate.totalCount ?? 0
  );

  const table = useReactTable<MinerReward>({
    data: data?.minerRewards ?? [],
    columns: ACCOUNT_MINER_REWARD_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortingValue,
      pagination: paginationValue
    },
    rowCount,
    onSortingChange: handleChangeSorting,
    onPaginationChange: handleChangePagination,
    manualSorting: true,
    manualPagination: true
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

  useEffect(() => {
    if (!loading && data?.meta.aggregate.totalCount != null) {
      setRowCount(data.meta.aggregate.totalCount);
    }
  }, [loading, data?.meta.aggregate.totalCount]);

  return {
    table,
    getStatus,
    error
  };
};
