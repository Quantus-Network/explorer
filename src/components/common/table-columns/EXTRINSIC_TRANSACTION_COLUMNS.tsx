import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { ExtrinsicTransfer } from '@/schemas';
import { formatMonetaryValue, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<ExtrinsicTransfer>();

export const EXTRINSIC_TRANSACTION_COLUMNS = [
  columnHelper.accessor('from', {
    id: 'from',
    header: 'From',
    cell: ({ getValue }) => {
      const { id } = getValue();

      return (
        <LinkWithCopy
          href={`${RESOURCES.accounts}/${id}`}
          text={formatTxAddress(id)}
          textCopy={id}
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
        <LinkWithCopy
          href={`${RESOURCES.accounts}/${id}`}
          text={formatTxAddress(id)}
          textCopy={id}
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

      return formatMonetaryValue(Number(amount), 5);
    },
    enableSorting: true
  })
];
