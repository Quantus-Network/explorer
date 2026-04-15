import type { QueryResult } from '@apollo/client';
import React from 'react';

import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { ContentContainer } from '@/components/ui/content-container';
import type { AccountResponse } from '@/schemas';

import { useAccountAllTransactions } from './hook';

interface Props {
  query: QueryResult<AccountResponse>;
  accountId: string;
}

export const AccountAllTransactions: React.FC<Props> = ({ query }) => {
  const { getStatus, table, error } = useAccountAllTransactions(query);

  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>All Account Activity</h2>

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
