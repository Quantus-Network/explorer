import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useExecutedReversibleTransactionsTable } from './hook';

export const ExecutedReversibleTransactionsTable = () => {
  const { getStatus, table, error } = useExecutedReversibleTransactionsTable();

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
