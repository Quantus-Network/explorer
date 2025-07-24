import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TransactionStatus } from '@/components/ui/transaction-status';
import { RESOURCES } from '@/constants/resources';
import type { BlockReversibleTransaction } from '@/schemas';
import { formatTimestamp, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<BlockReversibleTransaction>();

export const BLOCK_REVERSIBLE_TRANSACTION_COLUMNS = [
  columnHelper.accessor('node.extrinsicHash', {
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
  columnHelper.accessor('node.block.height', {
    id: 'blockNumber',
    header: 'Block',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.blocks}/${props.getValue()}`}
        text={props.getValue().toString()}
        textCopy={props.getValue().toString()}
      />
    ),
    enableSorting: true
  }),
  columnHelper.accessor('node.timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => formatTimestamp(props.getValue()),
    enableSorting: true
  }),
  columnHelper.accessor('node.scheduledAt', {
    id: 'scheduledAt',
    header: 'Scheduled At',
    cell: (props) => formatTimestamp(props.getValue()),
    enableSorting: true
  }),
  columnHelper.accessor('node.from.id', {
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
  columnHelper.accessor('node.to.id', {
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
  columnHelper.accessor('node.status', {
    id: 'status',
    header: 'Status',
    cell: (props) => <TransactionStatus status={props.getValue()} />,
    enableSorting: true
  })
];
