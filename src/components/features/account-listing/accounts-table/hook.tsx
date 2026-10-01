import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

import useApiClient from '@/api';
import { ACCOUNT_COLUMNS } from '@/components/common/table-columns/ACCOUNT_COLUMNS';
import type { AccountTypeFilterKey } from '@/constants/account-types';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { QUERY_DEFAULT_LIMIT } from '@/constants/query-default-limit';
import type { AccountSorts } from '@/constants/query-sorts';
import { useAccountTypeFilters } from '@/hooks/useAccountTypeFilters';
import { useOrderBy } from '@/hooks/useOrderBy';
import { useTableState } from '@/hooks/useTableState';
import type { AccountListItem } from '@/schemas';
import { accountTypeRuleWhere } from '@/utils/account-type-filter';
import { transformSortLiteral } from '@/utils/transform-sort';
import { uncountedRowCount } from '@/utils/uncounted-pagination';

const ACCOUNT_FILTER_KEYS: readonly AccountTypeFilterKey[] = ['account_type'];

export const useAccountsTable = () => {
  const api = useApiClient();
  const {
    orderBy,
    limit,
    currentPageIndex,
    handleChangeSorting,
    handleChangePagination,
    paginationValue
  } = useTableState('last_updated:desc', QUERY_DEFAULT_LIMIT);
  const accountTypeFilters = useAccountTypeFilters(ACCOUNT_FILTER_KEYS);
  const accountTypeRule = accountTypeFilters.filters.account_type;

  const orderByObject = useOrderBy<AccountSorts>(
    orderBy ?? 'last_updated:desc'
  );
  const sortingValue = transformSortLiteral(orderBy);

  const where = useMemo(
    () => (accountTypeRule ? accountTypeRuleWhere(accountTypeRule) : null),
    [accountTypeRule]
  );
  const isFiltered = where !== null;

  const variables = {
    orderBy: orderByObject,
    limit,
    offset: currentPageIndex * limit
  };

  const unfiltered = api.accounts.useGetAll({
    skip: isFiltered,
    pollInterval: DATA_POOL_INTERVAL,
    variables
  });
  const filtered = api.accounts.useGetFiltered({
    skip: !isFiltered,
    pollInterval: DATA_POOL_INTERVAL,
    variables: { ...variables, where: where ?? {} }
  });

  const { loading, error: fetchError } = isFiltered ? filtered : unfiltered;
  const accounts = isFiltered
    ? filtered.data?.accounts
    : unfiltered.data?.accounts;

  let latestRowCount: number | undefined;
  if (isFiltered) {
    latestRowCount = filtered.data
      ? uncountedRowCount({
          pageIndex: currentPageIndex,
          limit,
          pageRowCount: filtered.data.accounts.length,
          hasNextPage: filtered.data.hasNextPage
        })
      : undefined;
  } else {
    latestRowCount = unfiltered.data?.meta.totalCount;
  }

  const accountColumns = useMemo(() => ACCOUNT_COLUMNS, []);
  const [rowCount, setRowCount] = useState<number>(latestRowCount ?? 0);

  const table = useReactTable<AccountListItem>({
    data: accounts ?? [],
    columns: accountColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortingValue,
      pagination: paginationValue
    },
    rowCount,
    meta: { totalCountUnknown: isFiltered },
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
    if (!loading && latestRowCount != null) setRowCount(latestRowCount);
  }, [loading, latestRowCount]);

  return {
    table,
    getStatus,
    error,
    isFiltered,
    accountTypeFilters
  };
};
