'use client';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useAccountsTable } from './hook';

export const AccountsTable = () => {
  const { getStatus, table, error } = useAccountsTable();

  return (
    <DataTable
      table={table}
      fetch={{
        status: getStatus(),
        errorFallback: <p>Error: {error && error.message}</p>
      }}
      withControls
    />
  );
};
