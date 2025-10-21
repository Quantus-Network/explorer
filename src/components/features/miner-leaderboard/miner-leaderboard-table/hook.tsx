import type { OnChangeFn, PaginationState } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect, useMemo, useState } from 'react';

import api from '@/api';
import { MINER_LEADERBOARD_COLUMNS } from '@/components/common/table-columns/MINER_LEADERBOARD_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { MinerStats } from '@/schemas';

export const useMinerLeaderboardTable = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(QUERY_DEFAULT_LIMIT)
  );

  const currentPageIndex = page - 1;

  const paginationValue: PaginationState = {
    pageSize: limit,
    pageIndex: currentPageIndex
  };

  const handleChangePagination: OnChangeFn<PaginationState> = (pagination) => {
    if (typeof pagination === 'function') {
      const newPagination = pagination(paginationValue);

      setPage(newPagination.pageIndex + 1);
      setLimit(newPagination.pageSize);
    } else {
      setPage(pagination.pageIndex + 1);
      setLimit(pagination.pageSize);
    }
  };

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
