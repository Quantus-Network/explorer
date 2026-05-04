import { useSearch } from '@tanstack/react-router';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { SCHEDULED_REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/SCHEDULED_REVERSIBLE_TRANSACTION_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { ScheduledReversibleTransactionSorts } from '@/constants/query-sorts';
import { useOrderBy } from '@/hooks/useOrderBy';
import { useTableState } from '@/hooks/useTableState';
import type { ScheduledReversibleTransaction } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useScheduledReversibleTransactionsTable = () => {
  const api = useApiClient();
  const { accountId, block } = useSearch({
    strict: false
  }) as any;

  const {
    orderBy,
    limit,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue
  } = useTableState(null, QUERY_DEFAULT_LIMIT);

  const orderByObject = useOrderBy<ScheduledReversibleTransactionSorts>(
    orderBy ?? ''
  );
  const sortingValue = transformSortLiteral(orderBy);

  const {
    loading,
    data,
    error: fetchError
  } = api.scheduledReversibleTransactions.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: orderByObject,
      limit,
      offset: currentPageIndex * limit,
      ...(accountId && {
        where: {
          OR: [{ from: { id_eq: accountId } }, { to: { id_eq: accountId } }]
        }
      }),
      ...(block && {
        where: {
          block: { height_eq: Number(block) }
        }
      })
    }
  });

  const columns = useMemo(() => SCHEDULED_REVERSIBLE_TRANSACTION_COLUMNS, []);
  const [rowCount, setRowCount] = useState<number>(
    data?.meta.aggregate.totalCount ?? 0
  );

  const table = useReactTable<ScheduledReversibleTransaction>({
    data: data?.scheduledReversibleTransactions ?? [],
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
