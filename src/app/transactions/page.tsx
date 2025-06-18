import { TransactionsStats } from '@/components/features/transaction-listing/transactions-stats/TransactionsStats';
import { TransactionsTable } from '@/components/features/transaction-listing/transactions-table/TransactionsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

const Transactions = () => {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Transactions</h1>

        <TransactionsStats />
        <TransactionsTable />
      </ContentContainer>
    </SectionContainer>
  );
};

export default Transactions;
