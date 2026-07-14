import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useMinerRewardsTable } from './hook';

export const MinerRewardsTable = () => {
  const { getStatus, table, error } = useMinerRewardsTable();

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
