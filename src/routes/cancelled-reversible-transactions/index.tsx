import { createFileRoute } from '@tanstack/react-router';

import { CancelledReversibleTransactionHeading } from '@/components/features/cancelled-reversible-transaction-listing/cancelled-reversible-transaction-heading/CancelledReversibleTransactionHeading';
import { CancelledReversibleTransactionsStats } from '@/components/features/cancelled-reversible-transaction-listing/cancelled-reversible-transactions-stats/CancelledReversibleTransactionsStats';
import { CancelledReversibleTransactionsTable } from '@/components/features/cancelled-reversible-transaction-listing/cancelled-reversible-transactions-table/CancelledReversibleTransactionsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/cancelled-reversible-transactions/')({
  component: CancelledReversibleTransactions
});

function CancelledReversibleTransactions() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <CancelledReversibleTransactionHeading />

        <CancelledReversibleTransactionsStats />

        <CancelledReversibleTransactionsTable />
      </ContentContainer>
    </SectionContainer>
  );
}
