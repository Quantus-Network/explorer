import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useHighSecuritySetsTable } from './hook';

export const HighSecuritySetsTable = () => {
  const { getStatus, table, error } = useHighSecuritySetsTable();

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
