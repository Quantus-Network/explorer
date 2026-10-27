import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useAccountMinerRewards } from './hook';

interface Props {
  accountId: string;
}

export const AccountMinerRewards: React.FC<Props> = ({ accountId }) => {
  const { getStatus, table, error } = useAccountMinerRewards(accountId);

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
