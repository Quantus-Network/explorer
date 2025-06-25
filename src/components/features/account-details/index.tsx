'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as React from 'react';

import api from '@/api';
import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { RESOURCES } from '@/constants/resources';

import { AccountInformation } from './account-information/AccountInformation';
import { AccountTransactions } from './account-transactions/AccountTransactions';

interface Props {
  id: string;
}

export const AccountDetails: React.FC<Props> = ({ id }) => {
  const query = api.accounts.getById().useQuery(id);
  const { loading, data } = query;

  if (!loading && !data?.account) notFound();

  return (
    <>
      <SectionContainer>
        <ContentContainer className="flex flex-col gap-4">
          <h1>Account Details</h1>

          <AccountInformation query={query} />
        </ContentContainer>
      </SectionContainer>

      <SectionContainer>
        <ContentContainer className="flex flex-col gap-4">
          <h2>Recent Transactions</h2>

          <AccountTransactions query={query} />

          <Button variant="link" className="mx-auto w-fit">
            <Link href={`${RESOURCES.transactions}?accountId=${id}`}>
              See all transactions
            </Link>
          </Button>
        </ContentContainer>
      </SectionContainer>
    </>
  );
};
