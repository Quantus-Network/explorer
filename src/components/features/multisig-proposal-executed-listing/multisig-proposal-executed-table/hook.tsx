import { useSearch } from '@tanstack/react-router';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { MULTISIG_PROPOSAL_EXECUTED_COLUMNS } from '@/components/common/table-columns/MULTISIG_PROPOSAL_EXECUTED_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { MultisigProposalExecutedSorts } from '@/constants/query-sorts';
import { useOrderBy } from '@/hooks/useOrderBy';
import { useTableState } from '@/hooks/useTableState';
import type { MultisigProposalExecuted } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useMultisigProposalExecutedTable = () => {
  const api = useApiClient();
  const { block } = useSearch({
    strict: false
  }) as { block?: string };

  const {
    orderBy,
    limit,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue
  } = useTableState(null, QUERY_DEFAULT_LIMIT);

  const orderByObject = useOrderBy<MultisigProposalExecutedSorts>(
    orderBy ?? ''
  );
  const sortingValue = transformSortLiteral(orderBy);

  const {
    loading,
    data,
    error: fetchError
  } = api.multisigProposalExecuted.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: orderByObject,
      limit,
      offset: currentPageIndex * limit,
      ...(block && {
        where: {
          block: { height: { _eq: Number(block) } }
        }
      })
    }
  });

  const columns = useMemo(() => MULTISIG_PROPOSAL_EXECUTED_COLUMNS, []);
  const [rowCount, setRowCount] = useState<number>(
    data?.meta.aggregate.totalCount ?? 0
  );

  const table = useReactTable<MultisigProposalExecuted>({
    data: data?.multisigProposalExecutedEvents ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortingValue,
      pagination: paginationValue
    },
    rowCount,
    onSortingChange: handleChangeSorting,
    onPaginationChange: handleChangePagination,
    manualSorting: true,
    manualPagination: true
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

  useEffect(() => {
    if (!loading && data?.meta.aggregate.totalCount)
      setRowCount(data.meta.aggregate.totalCount);
  }, [loading, data?.meta.aggregate.totalCount]);

  return {
    table,
    getStatus,
    error: fetchError
  };
};
