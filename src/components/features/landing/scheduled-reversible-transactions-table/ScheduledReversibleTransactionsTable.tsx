import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useScheduledReversibleTransactionsTable } from './hook';

export const ScheduledReversibleTransactionsTable = () => {
  const { getStatus, table, error } = useScheduledReversibleTransactionsTable();

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
