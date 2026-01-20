import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { HIGH_SECURITY_SET_COLUMNS } from '@/components/common/table-columns/HIGH_SECURITY_SET_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { HighSecuritySet } from '@/schemas';

export const useHighSecuritySetsTable = () => {
  const api = useApiClient();
  const {
    loading,
    data,
    error: fetchError
  } = api.highSecuritySets.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });
  const highSecuritySetColumns = useMemo(() => HIGH_SECURITY_SET_COLUMNS, []);

  const table = useReactTable<HighSecuritySet>({
    data: data?.highSecuritySets ?? [],
    columns: highSecuritySetColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    rowCount: data?.highSecuritySets?.length ?? 0,
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
