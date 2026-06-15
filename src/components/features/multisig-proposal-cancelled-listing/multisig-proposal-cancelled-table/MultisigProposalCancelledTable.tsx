import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useMultisigProposalCancelledTable } from './hook';

export const MultisigProposalCancelledTable = () => {
  const { getStatus, table, error } = useMultisigProposalCancelledTable();

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
