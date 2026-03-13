import type { QueryResult } from '@apollo/client';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { BLOCK_SCHEDULED_REVERSIBLE_COLUMNS } from '@/components/common/table-columns/BLOCK_SCHEDULED_REVERSIBLE_COLUMNS';
import type {
  BlockResponse,
  BlockScheduledReversibleTransaction
} from '@/schemas';

export const useBlockScheduledReversibleTransactions = (
  query: QueryResult<BlockResponse>
) => {
  const { data, error: fetchError, loading } = query;
  const columns = useMemo(() => BLOCK_SCHEDULED_REVERSIBLE_COLUMNS, []);

  // Map BlockScheduledReversibleTransaction[] to ScheduledReversibleTransaction[]
  const tableData = useMemo(
    () => data?.scheduledReversibleTransactions?.edges ?? [],
    [data?.scheduledReversibleTransactions?.edges]
  );

  const table = useReactTable<BlockScheduledReversibleTransaction>({
    data: tableData,
    columns: columns as any,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false
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
