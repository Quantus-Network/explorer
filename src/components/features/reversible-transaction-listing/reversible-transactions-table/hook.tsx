import type {
  OnChangeFn,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';
import { useMemo } from 'react';

import api from '@/api';
import { REVERSIBLE_TRANSACTION_COLUMNS } from '@/components/common/table-columns/REVERSIBLE_TRANSACTION_COLUMNS';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { ReversibleTransactionSorts } from '@/constants/query-sorts';
import { REVERSIBLE_TRANSACTION_SORTS_LITERALS } from '@/constants/query-sorts';
import type { ReversibleTransaction } from '@/schemas';
import { transformSortLiteral } from '@/utils/transform-sort';

export const useReversibleTransactionsTable = () => {
  const accountId = useSearchParams().get('accountId');
  const block = useSearchParams().get('block');

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(QUERY_DEFAULT_LIMIT)
  );
  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsStringLiteral(REVERSIBLE_TRANSACTION_SORTS_LITERALS)
  );

  const currentPageIndex = page - 1;

  const sortingValue: SortingState = transformSortLiteral(sortBy);
  const paginationValue: PaginationState = {
    pageSize: limit,
    pageIndex: currentPageIndex
  };

  const handleChangeSorting: OnChangeFn<SortingState> = (sorting) => {
    if (typeof sorting === 'function') {
      const newValue = sorting(sortingValue);

      if (newValue[0]?.id) {
        const key = newValue[0].id;
        const order = newValue[0].desc ? 'DESC' : 'ASC';

        const newSortBy = `${key}_${order}` as ReversibleTransactionSorts;

        setSortBy(newSortBy);
      } else {
        setSortBy(null);
      }
    } else if (sorting[0]?.id) {
      const key = sorting[0].id;
      const order = sorting[0].desc ? 'DESC' : 'ASC';

      const newSortBy = `${key}_${order}` as ReversibleTransactionSorts;

      setSortBy(newSortBy);
    }
  };

  const handleChangePagination: OnChangeFn<PaginationState> = (pagination) => {
    if (typeof pagination === 'function') {
      const newPagination = pagination(paginationValue);

      setPage(newPagination.pageIndex + 1);
      setLimit(newPagination.pageSize);
    } else {
      setPage(pagination.pageIndex + 1);
      setLimit(pagination.pageSize);
    }
  };

  const {
    loading,
    data,
    error: fetchError
  } = api.reversibleTransactions.useGetAll({
    pollInterval: DATA_POOL_INTERVAL,
    variables: {
      orderBy: sortBy,
      limit,
      offset: currentPageIndex * limit,
      ...(accountId && {
        where: {
          who: { id_eq: accountId }
        }
      }),
      ...(block && {
        where: {
          block: { height_eq: Number(block) }
        }
      })
    }
  });

  const reversibleTransactionColumns = useMemo(
    () => REVERSIBLE_TRANSACTION_COLUMNS,
    []
  );

  const table = useReactTable<ReversibleTransaction>({
    data: data?.reversibleTransactions ?? [],
    columns: reversibleTransactionColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortingValue,
      pagination: paginationValue
    },
    rowCount: data?.meta.totalCount ?? 0,
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

  return {
    table,
    getStatus,
    error: fetchError
  };
};
