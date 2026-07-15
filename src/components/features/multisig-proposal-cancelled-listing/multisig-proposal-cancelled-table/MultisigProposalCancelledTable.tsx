import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useMultisigProposalCancelledTable } from './hook';

export const MultisigProposalCancelledTable = () => {
  const { getStatus, table, error } = useMultisigProposalCancelledTable();

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
