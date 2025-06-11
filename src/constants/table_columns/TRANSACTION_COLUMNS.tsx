import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns/format';
import Link from 'next/link';

import type { Transaction } from '@/schemas';
import { truncateWallet } from '@/utils/truncateWallet';

const columnHelper = createColumnHelper<Transaction>();

const TRANSACTION_COLUMNS = [
  columnHelper.accessor('extrinsicHash', {
    id: 'tx-hash',
    header: 'Transaction Hash',
    cell: (props) => (
      <Link href={`/transactions/${props.getValue()}`}>
        {truncateWallet(props.getValue())}
      </Link>
    )
  }),
  columnHelper.accessor('blockNumber', {
    id: 'block',
    header: 'Block',
    cell: (props) => `${props.getValue()}`
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) =>
      format(
        (typeof props.getValue() === 'string' && new Date(props.getValue())) ||
          props.getValue(),
        'MM/dd/yyyy, hh:mm:ss'
      )
  }),
  columnHelper.accessor('from.id', {
    id: 'from',
    header: 'From',
    cell: (props) => (
      <Link href={`/addresses/${props.getValue()}`}>
        {truncateWallet(props.getValue())}
      </Link>
    )
  }),
  columnHelper.accessor('to.id', {
    id: 'to',
    header: 'To',
    cell: (props) => (
      <Link href={`/addresses/${props.getValue()}`}>
        {truncateWallet(props.getValue())}
      </Link>
    )
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    header: 'Amount',
    cell: (props) => `${props.getValue()} Quantus`
  }),
  columnHelper.accessor('fee', {
    id: 'fee',
    header: 'Fee',
    cell: (props) => `${props.getValue()}`
  })
];

export { TRANSACTION_COLUMNS };
