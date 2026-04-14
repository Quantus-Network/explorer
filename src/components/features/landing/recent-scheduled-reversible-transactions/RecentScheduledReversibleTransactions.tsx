import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';

import { ScheduledReversibleTransactionsTable } from '../scheduled-reversible-transactions-table/ScheduledReversibleTransactionsTable';

export const RecentScheduledReversibleTransactions = () => {
  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Scheduled Reversible Transactions</h2>

      <ScheduledReversibleTransactionsTable />

      <Button variant="link" className="mx-auto w-fit">
        <Link to={RESOURCES.scheduledReversibleTransactions}>
          See all scheduled reversible transactions
        </Link>
      </Button>
    </ContentContainer>
  );
};
