import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { EXECUTED_REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/EXECUTED_REVERSIBLE_TRANSACTION_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { ExecutedReversibleTransaction } from '@/schemas';

export const useExecutedReversibleTransactionsTable = () => {
  const api = useApiClient();
  const {
    loading,
    data,
    error: fetchError
  } = api.executedReversibleTransactions.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });
  const columns = useMemo(() => EXECUTED_REVERSIBLE_TRANSACTION_COLUMNS, []);

  const table = useReactTable<ExecutedReversibleTransaction>({
    data: data?.executedReversibleTransactions ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    rowCount: data?.executedReversibleTransactions?.length ?? 0,
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
