import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';

import { ExecutedReversibleTransactionsTable } from '../executed-reversible-transactions-table/ExecutedReversibleTransactionsTable';

export const RecentExecutedReversibleTransactions = () => {
  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Executed Reversible Transactions</h2>

      <ExecutedReversibleTransactionsTable />

      <Button variant="link" className="mx-auto w-fit">
        <Link to={RESOURCES.executedReversibleTransactions}>
          See all executed reversible transactions
        </Link>
      </Button>
    </ContentContainer>
  );
};
