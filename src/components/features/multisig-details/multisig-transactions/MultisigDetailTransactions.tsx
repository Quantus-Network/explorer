import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useMultisigDetailTransactions } from './hook';

interface Props {
  walletId: string;
}

export const MultisigDetailTransactions: React.FC<Props> = ({ walletId }) => {
  const { getStatus, table, error } = useMultisigDetailTransactions(walletId);

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
