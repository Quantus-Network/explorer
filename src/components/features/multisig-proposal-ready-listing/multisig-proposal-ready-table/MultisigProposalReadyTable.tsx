import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useMultisigProposalReadyTable } from './hook';

export const MultisigProposalReadyTable = () => {
  const { getStatus, table, error } = useMultisigProposalReadyTable();

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
