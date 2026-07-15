import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useMultisigDetailProposals } from './hook';

interface Props {
  walletId: string;
}

export const MultisigDetailProposals: React.FC<Props> = ({ walletId }) => {
  const { getStatus, table, error } = useMultisigDetailProposals(walletId);

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
