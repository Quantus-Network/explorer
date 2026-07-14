import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useCancelledReversibleTransactionsTable } from './hook';

export const CancelledReversibleTransactionsTable = () => {
  const { getStatus, table, error } = useCancelledReversibleTransactionsTable();

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
