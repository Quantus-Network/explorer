import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useMultisigSignerApprovedTable } from './hook';

export const MultisigSignerApprovedTable = () => {
  const { getStatus, table, error } = useMultisigSignerApprovedTable();

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
