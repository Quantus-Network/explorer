'use client';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import api from '@/api';
import { Table } from '@/components/ui/table/Table';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { TRANSACTION_COLUMNS } from '@/constants/table_columns/TRANSACTION_COLUMNS';
import type { Transaction } from '@/schemas';

import styles from './RecentTransactions.module.scss';

export const RecentTransactions = () => {
  const { loading, data, error } = api.transactions.useGetAll({
    pollInterval: DATA_POOL_INTERVAL
  });
  const transactionColumns = useMemo(() => TRANSACTION_COLUMNS, []);

  const transactionTable = useReactTable<Transaction>({
    data: data?.transactions ?? [],
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false
  });

  const success = !loading && !error;

  return (
    <section className={styles.liveData}>
      <div className={styles.liveData__container}>
        <h2>Recent Transactions</h2>

        {loading && <p>Loading recent transactions...</p>}
        {success && <Table table={transactionTable} />}
        {!loading && error && <p>Error : {error.message}</p>}
      </div>
    </section>
  );
};
