'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { RESOURCES } from '@/constants/resources';

import { TransactionsTable } from '../transactions-table/TransactionsTable';

export const RecentTransactions = () => {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h2>Recent Immediate Transactions</h2>

        <TransactionsTable />

        <Button variant="link" className="mx-auto w-fit">
          <Link href={RESOURCES.transactions}>
            See all immediate transactions
          </Link>
        </Button>
      </ContentContainer>
    </SectionContainer>
  );
};
