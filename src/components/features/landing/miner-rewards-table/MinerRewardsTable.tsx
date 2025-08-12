import { DataTable } from '@/components/ui/composites/data-table/DataTable';

import { useMinerRewardsTable } from './hook';

export const MinerRewardsTable = () => {
  const { getStatus, table, error } = useMinerRewardsTable();

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
