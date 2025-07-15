'use client';

import type { QueryResult } from '@apollo/client';
import type { FC } from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import type { AccountResponse } from '@/schemas';

import { useAccountReversibleTransactions } from './hook';

interface Props {
  query: QueryResult<AccountResponse>;
}

export const AccountReversibleTransactions: FC<Props> = ({ query }) => {
  const { getStatus, table, error } = useAccountReversibleTransactions(query);

  return (
    <DataTable
      table={table}
      fetch={{
        status: getStatus(),
        errorFallback: <p>Error : {error && error.message}</p>
      }}
    />
  );
};
