import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';

import { TransactionsTable } from '../transactions-table/TransactionsTable';

export const RecentTransactions = () => {
  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Immediate Transactions</h2>

      <TransactionsTable />

      <Button variant="link" className="mx-auto w-fit">
        <Link to={RESOURCES.transactions}>See all immediate transactions</Link>
      </Button>
    </ContentContainer>
  );
};
