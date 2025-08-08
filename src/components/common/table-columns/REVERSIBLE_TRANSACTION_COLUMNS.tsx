import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { TransactionStatus } from '@/components/ui/transaction-status';
import { RESOURCES } from '@/constants/resources';
import type { ReversibleTransaction } from '@/schemas';
import { formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<ReversibleTransaction>();

export const REVERSIBLE_TRANSACTION_COLUMNS = [
  columnHelper.accessor('extrinsicHash', {
    id: 'tx-hash',
    header: 'Hash',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.reversibleTransactions}/${props.getValue()}`}
        text={formatTxAddress(props.getValue() ?? '-')}
        textCopy={props.getValue() ?? ''}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('block.height', {
    id: 'block_height',
    header: 'Block',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.blocks}/${props.getValue()}`}
        text={props.getValue().toString()}
      />
    ),
    enableSorting: true
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  }),
  columnHelper.accessor('scheduledAt', {
    id: 'scheduledAt',
    header: 'Scheduled At',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  }),
  columnHelper.accessor('from.id', {
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
  columnHelper.accessor('to.id', {
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
  columnHelper.accessor('status', {
    id: 'status',
    header: 'Status',
    cell: (props) => <TransactionStatus status={props.getValue()} />,
    enableSorting: true
  })
];
