import type { QueryResult } from '@apollo/client';
import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import type { AccountResponse } from '@/schemas';

import { useAccountTransactions } from './hook';

interface Props {
  query: QueryResult<AccountResponse>;
}

export const AccountTransactions: React.FC<Props> = ({ query }) => {
  const { getStatus, table, error } = useAccountTransactions(query);

  return (
    <DataTable
      table={table}
      fetch={{
        status: getStatus(),
        errorFallback: <p>Error: {error && error.message}</p>
      }}
    />
  );
};
