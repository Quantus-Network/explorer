'use client';

import { Table } from '@/components/ui/table/Table';

import { useTransactionsTable } from './hook';
import styles from './TransactionsTable.module.scss';

export const TransactionsTable = () => {
  const { error, success, loading, table } = useTransactionsTable();

  return (
    <section className={styles.liveData}>
      <div className={styles.liveData__container}>
        {loading && <p>Loading recent transactions...</p>}
        {success && <Table table={table} />}
        {!loading && error && <p>Error : {error.message}</p>}
      </div>
    </section>
  );
};
