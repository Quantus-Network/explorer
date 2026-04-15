import type { QueryResult } from '@apollo/client';
import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { ContentContainer } from '@/components/ui/content-container';
import type { BlockResponse } from '@/schemas';

import { useBlockAllTransactions } from './hook';

interface Props {
  query: QueryResult<BlockResponse>;
}

export const BlockAllTransactions: React.FC<Props> = ({ query }) => {
  const { getStatus, table, error } = useBlockAllTransactions(query);

  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Extrinsics</h2>

      <DataTable
        table={table}
        fetch={{
          status: getStatus(),
          errorFallback: <p>Error: {error && error.message}</p>
        }}
        withControls
      />
    </ContentContainer>
  );
};
