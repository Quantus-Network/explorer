import { createFileRoute } from '@tanstack/react-router';

import { ScheduledReversibleTransactionHeading } from '@/components/features/scheduled-reversible-transaction-listing/scheduled-reversible-transaction-heading/ScheduledReversibleTransactionHeading';
import { ScheduledReversibleTransactionsStats } from '@/components/features/scheduled-reversible-transaction-listing/scheduled-reversible-transactions-stats/ScheduledReversibleTransactionsStats';
import { ScheduledReversibleTransactionsTable } from '@/components/features/scheduled-reversible-transaction-listing/scheduled-reversible-transactions-table/ScheduledReversibleTransactionsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/scheduled-reversible-transactions/')({
  component: ScheduledReversibleTransactions
});

function ScheduledReversibleTransactions() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <ScheduledReversibleTransactionHeading />

        <ScheduledReversibleTransactionsStats />

        <ScheduledReversibleTransactionsTable />
      </ContentContainer>
    </SectionContainer>
  );
}
