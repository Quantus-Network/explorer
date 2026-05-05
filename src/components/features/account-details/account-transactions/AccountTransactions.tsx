import type { QueryResult } from '@apollo/client';
import { Link } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { ContentContainer } from '@/components/ui/content-container';
import type { AccountResponse } from '@/schemas';

import { useAccountTransactions } from './hook';

interface Props {
  query: QueryResult<AccountResponse>;
  accountId: string;
}

export const AccountTransactions: React.FC<Props> = ({ query, accountId }) => {
  const { getStatus, table, error } = useAccountTransactions(query);

  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Immediate Transactions</h2>

      <DataTable
        table={table}
        fetch={{
          status: getStatus(),
          errorFallback: <p>Error: {error && error.message}</p>
        }}
      />

      {!query.loading && query.data?.transactions.totalCount !== 0 && (
        <Button variant="link" className="mx-auto w-fit">
          <Link to="/immediate-transactions" search={{ accountId }}>
            See all immediate transactions
          </Link>
        </Button>
      )}
    </ContentContainer>
  );
};
