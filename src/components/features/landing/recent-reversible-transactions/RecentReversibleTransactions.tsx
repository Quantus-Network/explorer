'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { RESOURCES } from '@/constants/resources';

import { ReversibleTransactionsTable } from '../reversible-transactions-table/ReversibleTransactionsTable';

export const RecentReversibleTransactions = () => {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h2>Recent Reversible Transactions</h2>

        <ReversibleTransactionsTable />

        <Button variant="link" className="mx-auto w-fit">
          <Link href={RESOURCES.reversibleTransactions}>
            See all reversible transactions
          </Link>
        </Button>
      </ContentContainer>
    </SectionContainer>
  );
};
