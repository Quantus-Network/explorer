import type { QueryResult } from '@apollo/client';
import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import type { BlockResponse } from '@/schemas';

import { useBlockReversibleTransactions } from './hook';

interface Props {
  query: QueryResult<BlockResponse>;
}

export const BlockReversibleTransactions: React.FC<Props> = ({ query }) => {
  const { getStatus, table, error } = useBlockReversibleTransactions(query);

  return (
    <DataTable
      table={table}
      fetch={{
        status: getStatus(),
        errorFallback: <p>Error: {error && error.message}</p>
      }}
    />
  );
};
