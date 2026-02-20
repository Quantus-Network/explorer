import type { QueryResult } from '@apollo/client';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

import { createExtrinsicColumns } from '@/components/common/table-columns/EXTRINSIC_COLUMNS';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { BlockExtrinsic, BlockResponse } from '@/schemas';

const columns = createExtrinsicColumns();

export const useBlockAllTransactions = (query: QueryResult<BlockResponse>) => {
  const { data, error: fetchError, loading } = query;
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: QUERY_DEFAULT_LIMIT
  });

  // Get extrinsics directly from the block
  const tableData = useMemo(() => {
    if (!data) return [];

    const block = data.blocks?.[0];
    if (!block?.extrinsics) return [];

    // The extrinsics should be BlockExtrinsic[] with full details
    return block.extrinsics as BlockExtrinsic[];
  }, [data]);

  const table = useReactTable<BlockExtrinsic>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: false,
    state: {
      pagination
    },
    onPaginationChange: setPagination
  });

  const success = !loading && !fetchError;
  const error = !loading && fetchError;

  const getStatus = useCallback(() => {
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
  }, [success, error, loading]);

  return {
    table,
    getStatus,
    error: fetchError
  };
};
