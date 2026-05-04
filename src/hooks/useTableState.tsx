import type {
  OnChangeFn,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useCallback } from 'react';

export const useTableState = (
  initialOrderBy: string | null = null,
  initialLimit: number = 10
) => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(initialLimit)
  );
  const [orderBy, setOrderBy] = useQueryState('order_by');

  const currentPageIndex = page - 1;

  const handleChangeSorting: OnChangeFn<SortingState> = useCallback(
    (sorting) => {
      const [id, order] = orderBy?.split(':') ?? [];
      const currentSorting: SortingState =
        id && order
          ? [
              {
                id,
                desc: order === 'desc'
              }
            ]
          : [];

      const nextSorting =
        typeof sorting === 'function' ? sorting(currentSorting) : sorting;

      if (nextSorting[0]?.id) {
        const key = nextSorting[0].id;
        const newOrder = nextSorting[0].desc ? 'desc' : 'asc';
        setOrderBy(`${key}:${newOrder}`);
      } else {
        setOrderBy(null);
      }
    },
    [orderBy, setOrderBy]
  );

  const handleChangePagination: OnChangeFn<PaginationState> = useCallback(
    (pagination) => {
      const currentPagination: PaginationState = {
        pageSize: limit,
        pageIndex: currentPageIndex
      };

      const nextPagination =
        typeof pagination === 'function'
          ? pagination(currentPagination)
          : pagination;

      setPage(nextPagination.pageIndex + 1);
      setLimit(nextPagination.pageSize);
    },
    [currentPageIndex, limit, setLimit, setPage]
  );

  return {
    page,
    limit,
    orderBy: orderBy || initialOrderBy,
    setOrderBy,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue: {
      pageSize: limit,
      pageIndex: currentPageIndex
    }
  };
};
