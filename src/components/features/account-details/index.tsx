import { Link, notFound } from '@tanstack/react-router';
import * as React from 'react';

import api from '@/api';
import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { RESOURCES } from '@/constants/resources';
import { validateAccountId } from '@/utils/validate-account-id';

import { AccountInformation } from './account-information/AccountInformation';
import { AccountReversibleTransactions } from './account-reversible-transactions/AccountReversibleTransactions';
import { AccountTransactions } from './account-transactions/AccountTransactions';

interface Props {
  id: string;
}

export const AccountDetails: React.FC<Props> = ({ id }) => {
  const isAccountValid = validateAccountId(id);
  const query = api.accounts.getById().useQuery(id);
  const { loading, data } = query;

  if (!loading && !data?.account && !isAccountValid) throw notFound();

  return (
    <>
      <SectionContainer>
        <ContentContainer className="flex flex-col gap-4">
          <h1>Account Details</h1>

          <AccountInformation accountId={id} query={query} />
        </ContentContainer>
      </SectionContainer>

      <SectionContainer>
        <ContentContainer className="flex flex-col gap-4">
          <h2>Recent Immediate Transactions</h2>

          <AccountTransactions query={query} />

          {!loading && query.data?.transactions.totalCount !== 0 && (
            <Button variant="link" className="mx-auto w-fit">
              <Link to={`${RESOURCES.transactions}?accountId=${id}`}>
                See all immediate transactions
              </Link>
            </Button>
          )}
        </ContentContainer>
      </SectionContainer>

      <SectionContainer>
        <ContentContainer className="flex flex-col gap-4">
          <h2>Recent Reversible Transactions</h2>

          <AccountReversibleTransactions query={query} />

          {!loading && query.data?.reversibleTransactions.totalCount !== 0 && (
            <Button variant="link" className="mx-auto w-fit">
              <Link to={`${RESOURCES.reversibleTransactions}?accountId=${id}`}>
                See all reversible transactions
              </Link>
            </Button>
          )}
        </ContentContainer>
      </SectionContainer>
    </>
  );
};
