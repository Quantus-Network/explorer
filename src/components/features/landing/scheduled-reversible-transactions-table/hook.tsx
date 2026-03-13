import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { SCHEDULED_REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/SCHEDULED_REVERSIBLE_TRANSACTION_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { ScheduledReversibleTransaction } from '@/schemas';

export const useScheduledReversibleTransactionsTable = () => {
  const api = useApiClient();
  const {
    loading,
    data,
    error: fetchError
  } = api.scheduledReversibleTransactions.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });
  const columns = useMemo(() => SCHEDULED_REVERSIBLE_TRANSACTION_COLUMNS, []);

  const table = useReactTable<ScheduledReversibleTransaction>({
    data: data?.scheduledReversibleTransactions ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    rowCount: data?.scheduledReversibleTransactions?.length ?? 0,
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
