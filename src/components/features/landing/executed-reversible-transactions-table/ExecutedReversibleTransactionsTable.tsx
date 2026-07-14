import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useExecutedReversibleTransactionsTable } from './hook';

export const ExecutedReversibleTransactionsTable = () => {
  const { getStatus, table, error } = useExecutedReversibleTransactionsTable();

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
