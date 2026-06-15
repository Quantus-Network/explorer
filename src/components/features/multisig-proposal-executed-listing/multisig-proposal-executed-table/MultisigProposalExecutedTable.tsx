import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useMultisigProposalExecutedTable } from './hook';

export const MultisigProposalExecutedTable = () => {
  const { getStatus, table, error } = useMultisigProposalExecutedTable();

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
