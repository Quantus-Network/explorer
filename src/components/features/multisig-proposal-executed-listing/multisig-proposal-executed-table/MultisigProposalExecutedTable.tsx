import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useMultisigProposalExecutedTable } from './hook';

export const MultisigProposalExecutedTable = () => {
  const { getStatus, table, error } = useMultisigProposalExecutedTable();

  return (
    <DataTable
      table={table}
      fetch={{
        status: getStatus(),
        errorFallback: <FetchError error={error} />
      }}
      withControls
    />
  );
};
