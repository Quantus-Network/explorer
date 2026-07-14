import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useTransactionsTable } from './hook';

export const TransactionsTable = () => {
  const { getStatus, table, error } = useTransactionsTable();

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
