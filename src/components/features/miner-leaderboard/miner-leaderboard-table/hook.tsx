import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { MINER_LEADERBOARD_COLUMNS } from '@/components/common/table-columns/MINER_LEADERBOARD_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import { useTableState } from '@/hooks/useTableState';
import type { MinerStats } from '@/schemas';

export const useMinerLeaderboardTable = () => {
  const api = useApiClient();
  const { limit, currentPageIndex, handleChangePagination, paginationValue } =
    useTableState(null, QUERY_DEFAULT_LIMIT);

  const {
    loading,
    data,
    error: fetchError
  } = api.minerLeaderboard.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      limit,
      offset: currentPageIndex * limit
    }
  });

  const minerLeaderboardColumns = useMemo(() => MINER_LEADERBOARD_COLUMNS, []);
  const [rowCount, setRowCount] = useState<number>(data?.meta.totalCount ?? 0);

  const table = useReactTable<MinerStats>({
    data: data?.leaderboardEntries ?? [],
    columns: minerLeaderboardColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: paginationValue
    },
    rowCount,
    onPaginationChange: handleChangePagination,
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
    if (!loading && data?.meta.totalCount) setRowCount(data.meta.totalCount);
  }, [loading, data?.meta.totalCount]);

  return {
    table,
    getStatus,
    error
  };
};
