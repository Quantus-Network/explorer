import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useMinerLeaderboardTable } from './hook';

export const MinerLeaderboardTable = () => {
  const { getStatus, table, error } = useMinerLeaderboardTable();

  return (
    <DataTable
      table={table}
      fetch={{
        status: getStatus(),
        errorFallback: <FetchError error={error} />
      }}
      withControls
    />
  );
};
