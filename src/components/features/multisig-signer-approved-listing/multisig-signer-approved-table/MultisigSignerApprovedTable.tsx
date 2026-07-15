import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useMultisigSignerApprovedTable } from './hook';

export const MultisigSignerApprovedTable = () => {
  const { getStatus, table, error } = useMultisigSignerApprovedTable();

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
