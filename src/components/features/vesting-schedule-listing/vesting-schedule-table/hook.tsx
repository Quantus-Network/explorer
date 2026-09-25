import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { VESTING_SCHEDULE_COLUMNS } from '@/components/common/table-columns/VESTING_SCHEDULE_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { VestingScheduleSorts } from '@/constants/query-sorts';
import { useOrderBy } from '@/hooks/useOrderBy';
import { useTableState } from '@/hooks/useTableState';
import type { VestingScheduleListItem } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useVestingScheduleTable = () => {
  const api = useApiClient();
  const {
    orderBy,
    limit,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue
  } = useTableState('cliff:desc', QUERY_DEFAULT_LIMIT);

  const orderByObject = useOrderBy<VestingScheduleSorts>(
    orderBy ?? 'cliff:desc'
  );
  const sortingValue = transformSortLiteral(orderBy);

  const {
    loading,
    data,
    error: fetchError
  } = api.vestingSchedules.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: orderByObject,
      limit,
      offset: currentPageIndex * limit
    }
  });

  const columns = useMemo(() => VESTING_SCHEDULE_COLUMNS, []);
  const [rowCount, setRowCount] = useState<number>(
    data?.meta.aggregate.totalCount ?? 0
  );

  const table = useReactTable<VestingScheduleListItem>({
    data: data?.schedules ?? [],
    columns,
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
    if (!loading && data?.meta.aggregate.totalCount) {
      setRowCount(data.meta.aggregate.totalCount);
    }
  }, [loading, data?.meta.aggregate.totalCount]);

  return {
    table,
    getStatus,
    error
  };
};
