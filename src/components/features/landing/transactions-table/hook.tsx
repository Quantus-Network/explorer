import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import useApiClient from '@/api';
import { RECENT_UNIFIED_LIST_TRANSACTION_COLUMNS } from '@/components/common/table-columns/UNIFIED_LIST_TRANSACTION_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_RECENT_LIMIT } from '@/constants/query-recent-limit';
import type { UnifiedListTransaction } from '@/schemas';

export const useTransactionsTable = () => {
  const api = useApiClient();
  const {
    loading,
    data,
    error: fetchError
  } = api.unifiedTransactions.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });
  const transactionColumns = useMemo(
    () => RECENT_UNIFIED_LIST_TRANSACTION_COLUMNS,
    []
  );

  const table = useReactTable<UnifiedListTransaction>({
    data: data?.transactions ?? [],
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    state: {
      pagination: { pageSize: QUERY_RECENT_LIMIT, pageIndex: 0 }
    },
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
