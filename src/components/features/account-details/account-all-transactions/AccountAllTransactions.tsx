import React from 'react';

import { AccountTypeFilter } from '@/components/ui/composites/account-type-filter/AccountTypeFilter';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useAccountAllTransactions } from './hook';

interface Props {
  accountId: string;
}

export const AccountAllTransactions: React.FC<Props> = ({ accountId }) => {
  const { getStatus, table, error, isFiltered, accountTypeFilters } =
    useAccountAllTransactions(accountId);

  return (
    <div className="flex flex-col gap-4">
      <h2>Activity</h2>

      <AccountTypeFilter state={accountTypeFilters} />

      <DataTable
        table={table}
        fetch={{
          status: getStatus(),
          errorFallback: <FetchError error={error} />
        }}
        withControls
        emptyDescription={
          isFiltered ? 'No transactions match the current filters.' : undefined
        }
      />
    </div>
  );
};
