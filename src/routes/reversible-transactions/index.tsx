import { createFileRoute } from '@tanstack/react-router';

import { ReversibleTransactionHeading } from '@/components/features/reversible-transaction-listing/reversible-transaction-heading/ReversibleTransactionHeading';
import { ReversibleTransactionsStats } from '@/components/features/reversible-transaction-listing/reversible-transactions-stats/ReversibleTransactionsStats';
import { ReversibleTransactionsTable } from '@/components/features/reversible-transaction-listing/reversible-transactions-table/ReversibleTransactionsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/reversible-transactions/')({
  component: ReversibleTransactions
});

function ReversibleTransactions() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <ReversibleTransactionHeading />

        <ReversibleTransactionsStats />

        <ReversibleTransactionsTable />
      </ContentContainer>
    </SectionContainer>
  );
}
