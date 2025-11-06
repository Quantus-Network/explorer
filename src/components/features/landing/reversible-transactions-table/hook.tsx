import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/REVERSIBLE_TRANSACTION_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { ReversibleTransaction } from '@/schemas';

export const useReversibleTransactionsTable = () => {
  const api = useApiClient();
  const {
    loading,
    data,
    error: fetchError
  } = api.reversibleTransactions.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });
  const transactionColumns = useMemo(() => REVERSIBLE_TRANSACTION_COLUMNS, []);

  const table = useReactTable<ReversibleTransaction>({
    data: data?.reversibleTransactions ?? [],
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    rowCount: data?.reversibleTransactions?.length ?? 0,
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
