import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useErrorEventsTable } from './hook';

export const ErrorEventsTable = () => {
  const { getStatus, table, error } = useErrorEventsTable();

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
