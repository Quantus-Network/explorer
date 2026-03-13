import type { QueryResult } from '@apollo/client';
import { Link } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';
import type { BlockResponse } from '@/schemas';

import { useBlockExecutedReversibleTransactions } from './hook';

interface Props {
  query: QueryResult<BlockResponse>;
}

export const BlockExecutedReversibleTransactions: React.FC<Props> = ({
  query
}) => {
  const { getStatus, table, error } =
    useBlockExecutedReversibleTransactions(query);

  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Executed Reversible Transactions</h2>

      <DataTable
        table={table}
        fetch={{
          status: getStatus(),
          errorFallback: <p>Error: {error && error.message}</p>
        }}
      />

      {!query.loading &&
        query.data?.executedReversibleTransactions.totalCount !== 0 && (
          <Button variant="link" className="mx-auto w-fit">
            <Link
              to={RESOURCES.executedReversibleTransactions}
              search={{ block: query.data?.blocks[0]?.height }}
            >
              See all executed reversible transactions
            </Link>
          </Button>
        )}
    </ContentContainer>
  );
};
