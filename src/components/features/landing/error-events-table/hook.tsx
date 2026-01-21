import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { ERROR_EVENT_COLUMNS } from '@/components/common/table-columns/ERROR_EVENT_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { ErrorEvent } from '@/schemas';

export const useErrorEventsTable = () => {
  const api = useApiClient();

  const {
    loading,
    data,
    error: fetchError
  } = api.errors.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });

  const errorEventColumns = useMemo(() => ERROR_EVENT_COLUMNS, []);

  const table = useReactTable<ErrorEvent>({
    data: data?.errorEvents ?? [],
    columns: errorEventColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    rowCount: data?.errorEvents?.length ?? 0,
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
