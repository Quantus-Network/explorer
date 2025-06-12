import { Heading } from '@/components/features/transaction-listing/heading/Heading';
import { TransactionsTable } from '@/components/features/transaction-listing/transactions-table/TransactionsTable';

const Transactions = () => {
  return (
    <>
      <Heading />
      <TransactionsTable />
    </>
  );
};

export default Transactions;
