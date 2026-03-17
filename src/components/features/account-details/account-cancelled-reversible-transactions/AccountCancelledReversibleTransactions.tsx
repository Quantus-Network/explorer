import type { QueryResult } from '@apollo/client';
import { Link } from '@tanstack/react-router';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';
import type { AccountResponse } from '@/schemas';

import { useAccountCancelledReversibleTransactions } from './hook';

interface Props {
  query: QueryResult<AccountResponse>;
  accountId: string;
}

export const AccountCancelledReversibleTransactions: FC<Props> = ({
  query,
  accountId
}) => {
  const { getStatus, table, error } =
    useAccountCancelledReversibleTransactions(query);

  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Cancelled Reversible Transactions</h2>

      <DataTable
        table={table}
        fetch={{
          status: getStatus(),
          errorFallback: <p>Error : {error && error.message}</p>
        }}
      />

      {!query.loading &&
        query.data?.cancelledReversibleTransactions.totalCount !== 0 && (
          <Button variant="link" className="mx-auto w-fit">
            <Link
              to={RESOURCES.cancelledReversibleTransactions}
              search={{ accountId }}
            >
              See all cancelled reversible transactions
            </Link>
          </Button>
        )}
    </ContentContainer>
  );
};
