import type { QueryResult } from '@apollo/client';
import { Link } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';
import type { BlockResponse } from '@/schemas';

import { useBlockScheduledReversibleTransactions } from './hook';

interface Props {
  query: QueryResult<BlockResponse>;
}

export const BlockScheduledReversibleTransactions: React.FC<Props> = ({
  query
}) => {
  const { getStatus, table, error } =
    useBlockScheduledReversibleTransactions(query);

  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Scheduled Reversible Transactions</h2>

      <DataTable
        table={table}
        fetch={{
          status: getStatus(),
          errorFallback: <p>Error: {error && error.message}</p>
        }}
      />

      {!query.loading &&
        query.data?.scheduledReversibleTransactions.totalCount !== 0 && (
          <Button variant="link" className="mx-auto w-fit">
            <Link
              to={RESOURCES.scheduledReversibleTransactions}
              search={{ block: query.data?.blocks[0]?.height }}
            >
              See all scheduled reversible transactions
            </Link>
          </Button>
        )}
    </ContentContainer>
  );
};
