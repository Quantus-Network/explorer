import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useBlocksTable } from './hook';

export const BlocksTable = () => {
  const { getStatus, table, error } = useBlocksTable();

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
