import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';

import { CancelledReversibleTransactionsTable } from '../cancelled-reversible-transactions-table/CancelledReversibleTransactionsTable';

export const RecentCancelledReversibleTransactions = () => {
  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Cancelled Reversible Transactions</h2>

      <CancelledReversibleTransactionsTable />

      <Button variant="link" className="mx-auto w-fit">
        <Link to={RESOURCES.cancelledReversibleTransactions}>
          See all cancelled reversible transactions
        </Link>
      </Button>
    </ContentContainer>
  );
};
