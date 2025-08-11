import type { QueryResult } from '@apollo/client';
import { Link } from '@tanstack/react-router';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { ContentContainer } from '@/components/ui/content-container';
import type { AccountResponse } from '@/schemas';

import { useAccountReversibleTransactions } from './hook';

interface Props {
  query: QueryResult<AccountResponse>;
  accountId: string;
}

export const AccountReversibleTransactions: FC<Props> = ({
  query,
  accountId
}) => {
  const { getStatus, table, error } = useAccountReversibleTransactions(query);

  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Reversible Transactions</h2>

      <DataTable
        table={table}
        fetch={{
          status: getStatus(),
          errorFallback: <p>Error : {error && error.message}</p>
        }}
      />

      {!query.loading &&
        query.data?.reversibleTransactions.totalCount !== 0 && (
          <Button variant="link" className="mx-auto w-fit">
            <Link to="/reversible-transactions" search={{ accountId }}>
              See all reversible transactions
            </Link>
          </Button>
        )}
    </ContentContainer>
  );
};
