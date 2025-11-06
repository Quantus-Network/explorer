import { useSearch } from '@tanstack/react-router';
import type {
  OnChangeFn,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { MINER_REWARD_COLUMNS } from '@/components/common/table-columns/MINER_REWARD_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { MinerRewardSorts } from '@/constants/query-sorts';
import { MINER_REWARD_SORTS_LITERALS } from '@/constants/query-sorts';
import type { MinerReward } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useMinerRewardsTable = () => {
  const api = useApiClient();
  const { accountId } = useSearch({
    strict: false
  }) as any;

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(QUERY_DEFAULT_LIMIT)
  );
  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsStringLiteral(MINER_REWARD_SORTS_LITERALS)
  );

  const currentPageIndex = page - 1;

  const sortingValue: SortingState = transformSortLiteral(sortBy);
  const paginationValue: PaginationState = {
    pageSize: limit,
    pageIndex: currentPageIndex
  };

  const handleChangeSorting: OnChangeFn<SortingState> = (sorting) => {
    if (typeof sorting === 'function') {
      const newValue = sorting(sortingValue);

      if (newValue[0]?.id) {
        const key = newValue[0].id;
        const order = newValue[0].desc ? 'DESC' : 'ASC';

        const newSortBy = `${key}_${order}` as MinerRewardSorts;

        setSortBy(newSortBy);
      } else {
        setSortBy(null);
      }
    } else if (sorting[0]?.id) {
      const key = sorting[0].id;
      const order = sorting[0].desc ? 'DESC' : 'ASC';

      const newSortBy = `${key}_${order}` as MinerRewardSorts;

      setSortBy(newSortBy);
    }
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
  } = api.minerRewards.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: sortBy,
      limit,
      offset: currentPageIndex * limit,
      ...(accountId && {
        where: {
          miner: { id_eq: accountId }
        }
      })
    }
  });

  const minerRewardColumns = useMemo(() => MINER_REWARD_COLUMNS, []);
  const [rowCount, setRowCount] = useState<number>(data?.meta.totalCount ?? 0);

  const table = useReactTable<MinerReward>({
    data: data?.minerRewards ?? [],
    columns: minerRewardColumns,
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
    if (!loading && data?.meta.totalCount) setRowCount(data.meta.totalCount);
  }, [loading, data?.meta.totalCount]);

  return {
    table,
    getStatus,
    error
  };
};
