import { createColumnHelper } from '@tanstack/react-table';

import { AccountAddressCell } from '@/components/ui/composites/account-address-cell/AccountAddressCell';
import { RESOURCES } from '@/constants/resources';
import type { ExtrinsicTransfer } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';

const columnHelper = createColumnHelper<ExtrinsicTransfer>();

export const EXTRINSIC_TRANSACTION_COLUMNS = [
  columnHelper.accessor('from', {
    id: 'from',
    header: 'From',
    cell: ({ getValue }) => {
      const { id } = getValue();

      return (
        <AccountAddressCell
          address={id}
          href={`${RESOURCES.accounts}/${id}`}
          truncate={false}
        />
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('to', {
    id: 'to',
    header: 'To',
    cell: ({ getValue }) => {
      const { id } = getValue();

      return (
        <AccountAddressCell
          address={id}
          href={`${RESOURCES.accounts}/${id}`}
          truncate={false}
        />
      );
    },
    enableSorting: true
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    header: 'Amount',
    cell: ({ getValue }) => {
      const amount = getValue();

      return formatMonetaryValue(amount, 5);
    },
    enableSorting: true
  })
];
