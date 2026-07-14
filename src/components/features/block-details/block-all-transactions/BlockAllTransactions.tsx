import type { QueryResult } from '@apollo/client';
import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';
import type { BlockResponse } from '@/schemas';

import { useBlockAllTransactions } from './hook';

interface Props {
  query: QueryResult<BlockResponse>;
}

export const BlockAllTransactions: React.FC<Props> = ({ query }) => {
  const { getStatus, table, error } = useBlockAllTransactions(query);

  return (
    <div className="flex flex-col gap-4">
      <div className="section-label">Transactions in this block</div>

      <DataTable
        table={table}
        fetch={{
          status: getStatus(),
          errorFallback: <FetchError error={error} />
        }}
        withControls
        emptyTitle="No transactions in this block"
        emptyDescription="This block contained only the miner reward with no user transactions."
      />
    </div>
  );
};
