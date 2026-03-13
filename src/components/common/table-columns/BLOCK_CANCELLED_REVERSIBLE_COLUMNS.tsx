import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { BlockCancelledReversibleTransaction } from '@/schemas';
import { formatMonetaryValue, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<BlockCancelledReversibleTransaction>();

export const BLOCK_CANCELLED_REVERSIBLE_COLUMNS = [
  columnHelper.accessor('node.txId', {
    id: 'tx-id',
    header: 'Tx ID',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.cancelledReversibleTransactions}/${props.getValue()}`}
        text={formatTxAddress(props.getValue() ?? '-')}
        textCopy={props.getValue() ?? ''}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('node.scheduledTransfer.extrinsicHash', {
    id: 'tx-hash',
    header: 'Hash',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.cancelledReversibleTransactions}/${props.row.original.node.txId}`}
        text={formatTxAddress(props.getValue() ?? '-')}
        textCopy={props.getValue() ?? ''}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('node.timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  }),
  columnHelper.accessor('node.cancelledBy.id', {
    id: 'cancelledBy',
    header: 'Cancelled By',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={formatTxAddress(props.getValue())}
        textCopy={props.getValue()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('node.scheduledTransfer.from.id', {
    id: 'from',
    header: 'From',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={formatTxAddress(props.getValue())}
        textCopy={props.getValue()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('node.scheduledTransfer.to.id', {
    id: 'to',
    header: 'To',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={formatTxAddress(props.getValue())}
        textCopy={props.getValue()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('node.scheduledTransfer.amount', {
    id: 'amount',
    header: 'Amount',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  })
];
