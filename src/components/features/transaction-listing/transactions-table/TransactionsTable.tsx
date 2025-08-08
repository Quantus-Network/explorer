import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useTransactionsTable } from './hook';

export const TransactionsTable = () => {
  const { getStatus, table, error } = useTransactionsTable();

  return (
    <DataTable
      table={table}
      fetch={{
        status: getStatus(),
        errorFallback: <p>Error: {error && error.message}</p>
      }}
      withControls
    />
  );
};
