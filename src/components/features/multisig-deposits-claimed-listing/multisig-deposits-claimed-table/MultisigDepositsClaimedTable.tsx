import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useMultisigDepositsClaimedTable } from './hook';

export const MultisigDepositsClaimedTable = () => {
  const { getStatus, table, error } = useMultisigDepositsClaimedTable();

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
