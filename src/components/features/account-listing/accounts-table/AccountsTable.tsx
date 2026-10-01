import { AccountTypeFilter } from '@/components/ui/composites/account-type-filter/AccountTypeFilter';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { FetchError } from '@/components/ui/composites/fetch-error/FetchError';

import { useAccountsTable } from './hook';

export const AccountsTable = () => {
  const { getStatus, table, error, isFiltered, accountTypeFilters } =
    useAccountsTable();

  return (
    <div className="flex flex-col gap-4">
      <AccountTypeFilter state={accountTypeFilters} />

      <DataTable
        table={table}
        fetch={{
          status: getStatus(),
          errorFallback: <FetchError error={error} />
        }}
        withControls
        emptyDescription={
          isFiltered ? 'No accounts match the current filters.' : undefined
        }
      />
    </div>
  );
};
