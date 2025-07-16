import { Suspense } from 'react';

import { TransactionHeading } from '@/components/features/transaction-listing/transaction-heading/TransactionHeading';
import { TransactionsStats } from '@/components/features/transaction-listing/transactions-stats/TransactionsStats';
import { TransactionsTable } from '@/components/features/transaction-listing/transactions-table/TransactionsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

const Transactions = () => {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <Suspense>
          <TransactionHeading />
        </Suspense>

        <Suspense>
          <TransactionsStats />
        </Suspense>

        <Suspense>
          <TransactionsTable />
        </Suspense>
      </ContentContainer>
    </SectionContainer>
  );
};

export default Transactions;
