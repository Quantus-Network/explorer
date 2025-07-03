import { Suspense } from 'react';

import { ReversibleTransactionHeading } from '@/components/features/reversible-transaction-listing/reversible-transaction-heading/ReversibleTransactionHeading';
import { ReversibleTransactionsStats } from '@/components/features/reversible-transaction-listing/reversible-transactions-stats/ReversibleTransactionsStats';
import { ReversibleTransactionsTable } from '@/components/features/reversible-transaction-listing/reversible-transactions-table/ReversibleTransactionsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

const ReversibleTransactions = () => {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <Suspense>
          <ReversibleTransactionHeading />
        </Suspense>

        <Suspense>
          <ReversibleTransactionsStats />
        </Suspense>

        <Suspense>
          <ReversibleTransactionsTable />
        </Suspense>
      </ContentContainer>
    </SectionContainer>
  );
};

export default ReversibleTransactions;
