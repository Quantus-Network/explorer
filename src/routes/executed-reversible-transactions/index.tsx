import { createFileRoute } from '@tanstack/react-router';

import { ExecutedReversibleTransactionHeading } from '@/components/features/executed-reversible-transaction-listing/executed-reversible-transaction-heading/ExecutedReversibleTransactionHeading';
import { ExecutedReversibleTransactionsStats } from '@/components/features/executed-reversible-transaction-listing/executed-reversible-transactions-stats/ExecutedReversibleTransactionsStats';
import { ExecutedReversibleTransactionsTable } from '@/components/features/executed-reversible-transaction-listing/executed-reversible-transactions-table/ExecutedReversibleTransactionsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/executed-reversible-transactions/')({
  component: ExecutedReversibleTransactions
});

function ExecutedReversibleTransactions() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <ExecutedReversibleTransactionHeading />

        <ExecutedReversibleTransactionsStats />

        <ExecutedReversibleTransactionsTable />
      </ContentContainer>
    </SectionContainer>
  );
}
