import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import api from '@/api';
import { TRANSACTION_COLUMNS } from '@/components/common/table-columns/TRANSACTION_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { Transaction } from '@/schemas';

export const useTransactionsTable = () => {
  const {
    loading,
    data,
    error: fetchError
  } = api.transactions.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });
  const transactionColumns = useMemo(() => TRANSACTION_COLUMNS, []);

  const table = useReactTable<Transaction>({
    data: data?.transactions ?? [],
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    rowCount: data?.transactions?.length ?? 0,
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
