import type { QueryResult } from '@apollo/client';
import { Link } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { ContentContainer } from '@/components/ui/content-container';
import type { BlockResponse } from '@/schemas';

import { useBlockTransactions } from './hook';

interface Props {
  query: QueryResult<BlockResponse>;
}

export const BlockTransactions: React.FC<Props> = ({ query }) => {
  const { getStatus, table, error } = useBlockTransactions(query);

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

      {!query.loading &&
        query.data?.transactions.aggregate.totalCount !== 0 && (
          <Button variant="link" className="mx-auto w-fit">
            <Link
              to="/immediate-transactions"
              search={{ block: query.data?.blocks[0]?.height }}
            >
              See all immediate transactions
            </Link>
          </Button>
        )}
    </ContentContainer>
  );
};
