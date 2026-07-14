import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useBlocksTable } from './hook';

export const BlocksTable = () => {
  const { getStatus, table, error } = useBlocksTable();

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
