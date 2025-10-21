import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useMinerLeaderboardTable } from './hook';

export const MinerLeaderboardTable = () => {
  const { getStatus, table, error } = useMinerLeaderboardTable();

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
