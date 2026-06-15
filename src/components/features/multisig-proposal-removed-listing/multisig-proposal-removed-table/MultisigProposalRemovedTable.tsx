import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useMultisigProposalRemovedTable } from './hook';

export const MultisigProposalRemovedTable = () => {
  const { getStatus, table, error } = useMultisigProposalRemovedTable();

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
