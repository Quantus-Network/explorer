import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { CANCELLED_REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/CANCELLED_REVERSIBLE_TRANSACTION_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { CancelledReversibleTransaction } from '@/schemas';

export const useCancelledReversibleTransactionsTable = () => {
  const api = useApiClient();
  const {
    loading,
    data,
    error: fetchError
  } = api.cancelledReversibleTransactions.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });
  const columns = useMemo(() => CANCELLED_REVERSIBLE_TRANSACTION_COLUMNS, []);

  const table = useReactTable<CancelledReversibleTransaction>({
    data: data?.cancelledReversibleTransactions ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    rowCount: data?.cancelledReversibleTransactions?.length ?? 0,
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
