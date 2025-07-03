'use client';

import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useReversibleTransactionsTable } from './hook';

export const ReversibleTransactionsTable = () => {
  const { getStatus, table, error } = useReversibleTransactionsTable();

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
