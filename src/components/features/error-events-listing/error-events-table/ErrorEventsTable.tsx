import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useErrorEventsTable } from './hook';

export const ErrorEventsTable = () => {
  const { getStatus, table, error } = useErrorEventsTable();

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
