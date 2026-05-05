import type { QueryResult } from '@apollo/client';
import { Link } from '@tanstack/react-router';
import React from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';
import type { AccountResponse } from '@/schemas';

import { useAccountGuardian } from './hook';

interface Props {
  query: QueryResult<AccountResponse>;
  accountId: string;
}

export const AccountGuardian: React.FC<Props> = ({ query, accountId }) => {
  const { getStatus, table, error } = useAccountGuardian(query);

  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Guardian Account</h2>

      <DataTable
        table={table}
        fetch={{
          status: getStatus(),
          errorFallback: <p>Error: {error && error.message}</p>
        }}
      />

      {!query.loading && query.data?.guardian.totalCount !== 0 && (
        <Button variant="link" className="mx-auto w-fit">
          <Link to={RESOURCES.highSecuritySets} search={{ accountId }}>
            See all guardian accounts
          </Link>
        </Button>
      )}
    </ContentContainer>
  );
};
