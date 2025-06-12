import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns/format';
import Link from 'next/link';

import type { Transaction } from '@/schemas';
import { truncateWallet } from '@/utils/truncate-wallet';

const columnHelper = createColumnHelper<Transaction>();

const TRANSACTION_COLUMNS = [
  columnHelper.display({
    id: 'number',
    header: '#',
    cell: ({ row: { index } }) => `${index + 1}`,
    enableSorting: false
  }),
  columnHelper.accessor('extrinsicHash', {
    id: 'tx-hash',
    header: 'Transaction Hash',
    cell: (props) => (
      <Link href={`/transactions/${props.getValue()}`}>
        {truncateWallet(props.getValue())}
      </Link>
    ),
    enableSorting: false
  }),
  columnHelper.accessor('blockNumber', {
    id: 'blockNumber',
    header: 'Block',
    cell: (props) => `${props.getValue()}`,
    enableSorting: true
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) =>
      format(
        (typeof props.getValue() === 'string' && new Date(props.getValue())) ||
          props.getValue(),
        'MM/dd/yyyy, hh:mm:ss'
      ),
    enableSorting: true
  }),
  columnHelper.accessor('from.id', {
    id: 'from',
    header: 'From',
    cell: (props) => (
      <Link href={`/addresses/${props.getValue()}`}>
        {truncateWallet(props.getValue())}
      </Link>
    ),
    enableSorting: false
  }),
  columnHelper.accessor('to.id', {
    id: 'to',
    header: 'To',
    cell: (props) => (
      <Link href={`/addresses/${props.getValue()}`}>
        {truncateWallet(props.getValue())}
      </Link>
    ),
    enableSorting: false
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    header: 'Amount',
    cell: (props) => `${props.getValue()} Quantus`,
    enableSorting: true
  }),
  columnHelper.accessor('fee', {
    id: 'fee',
    header: 'Fee',
    cell: (props) => `${props.getValue()}`,
    enableSorting: true
  })
];

export { TRANSACTION_COLUMNS };
