import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useScheduledReversibleTransactionsTable } from './hook';

export const ScheduledReversibleTransactionsTable = () => {
  const { getStatus, table, error } = useScheduledReversibleTransactionsTable();

  return (
    <DataTable
      table={table}
      fetch={{
        status: getStatus(),
        errorFallback: <FetchError error={error} />
      }}
    />
  );
};
