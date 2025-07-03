import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TransactionStatus } from '@/components/ui/transaction-status';
import { RESOURCES } from '@/constants/resources';
import type { ReversibleTransaction } from '@/schemas';
import { formatTimestamp, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<ReversibleTransaction>();

export const REVERSIBLE_TRANSACTION_COLUMNS = [
  columnHelper.accessor('tx', {
    id: 'tx',
    header: 'Transaction',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.transactions}/${props.getValue()}`}
        text={formatTxAddress(props.getValue() ?? '-')}
        textCopy={props.getValue() ?? ''}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('extrinsicHash', {
    id: 'tx-hash',
    header: 'Reversible Transaction Hash',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.transactions}/${props.getValue()}`}
        text={formatTxAddress(props.getValue() ?? '-')}
        textCopy={props.getValue() ?? ''}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('block.height', {
    id: 'blockHeight',
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
    cell: (props) => formatTimestamp(props.getValue()),
    enableSorting: true
  }),
  columnHelper.accessor('scheduledAt', {
    id: 'scheduledAt',
    header: 'Scheduled At',
    cell: (props) => formatTimestamp(props.getValue()),
    enableSorting: true
  }),
  columnHelper.accessor('who.id', {
    id: 'who',
    header: 'Owner',
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
