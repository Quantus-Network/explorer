import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useCancelledReversibleTransactionsTable } from './hook';

export const CancelledReversibleTransactionsTable = () => {
  const { getStatus, table, error } = useCancelledReversibleTransactionsTable();

  return (
    <DataTable
      table={table}
      fetch={{
        status: getStatus(),
        errorFallback: <p>Error : {error && error.message}</p>
      }}
    />
  );
};
