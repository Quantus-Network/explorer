'use client';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import { useMemo } from 'react';

import api from '@/api';
import { TRANSACTION_COLUMNS } from '@/components/common/table-columns/TRANSACTION_COLUMNS';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { RESOURCES } from '@/constants/resources';
import type { Transaction } from '@/schemas';

export const RecentTransactions = () => {
  const {
    loading,
    data,
    error: fetchError
  } = api.transactions.useGetRecent({
    pollInterval: DATA_POOL_INTERVAL
  });
  const transactionColumns = useMemo(() => TRANSACTION_COLUMNS, []);

  const transactionTable = useReactTable<Transaction>({
    data: data?.transactions ?? [],
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false
  });

  const success = !loading && !fetchError;
  const error = !loading && fetchError;

  const getStatus = () => {
    switch (true) {
      case success:
        return 'success';
      case !!error:
        return 'error';
      case !!loading:
        return 'loading';
      default:
        return 'idle';
    }
  };

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h2>Recent Transactions</h2>

        <DataTable
          table={transactionTable}
          fetch={{
            status: getStatus(),
            errorFallback: <p>Error : {error && error.message}</p>
          }}
        />

        <Button variant="link" className="mx-auto w-fit">
          <Link href={RESOURCES.transactions}>See all transactions</Link>
        </Button>
      </ContentContainer>
    </SectionContainer>
  );
};
