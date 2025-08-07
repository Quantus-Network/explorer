import { createFileRoute } from '@tanstack/react-router';

import { TransactionHeading } from '@/components/features/transaction-listing/transaction-heading/TransactionHeading';
import { TransactionsStats } from '@/components/features/transaction-listing/transactions-stats/TransactionsStats';
import { TransactionsTable } from '@/components/features/transaction-listing/transactions-table/TransactionsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/immediate-transactions/')({
  component: Transactions
});

function Transactions() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <TransactionHeading />

        <TransactionsStats />

        <TransactionsTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default Transactions;
