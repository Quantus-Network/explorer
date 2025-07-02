'use client';

import type { QueryResult } from '@apollo/client';
import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import type { BlockResponse } from '@/schemas';

import { useBlockTransactions } from './hook';

interface Props {
  query: QueryResult<BlockResponse>;
}

export const BlockTransactions: React.FC<Props> = ({ query }) => {
  const { getStatus, table, error } = useBlockTransactions(query);

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
