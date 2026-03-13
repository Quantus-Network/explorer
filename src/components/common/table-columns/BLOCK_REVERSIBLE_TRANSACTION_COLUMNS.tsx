import { createColumnHelper } from '@tanstack/react-table';

import { ReversibleTransferStatus } from '@/__generated__/graphql';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { TransactionStatus } from '@/components/ui/transaction-status';
import { RESOURCES } from '@/constants/resources';
import type { BlockReversibleTransaction } from '@/schemas';
import { formatMonetaryValue, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<BlockReversibleTransaction>();

const getReversibleTransactionHref = (
  status: ReversibleTransferStatus,
  txId: string
) => {
  switch (status) {
    case ReversibleTransferStatus.Scheduled:
      return `${RESOURCES.scheduledReversibleTransactions}/${txId}`;
    case ReversibleTransferStatus.Executed:
      return `${RESOURCES.executedReversibleTransactions}/${txId}`;
    case ReversibleTransferStatus.Cancelled:
      return `${RESOURCES.cancelledReversibleTransactions}/${txId}`;
    default:
      return '#';
  }
};

export const BLOCK_REVERSIBLE_TRANSACTION_COLUMNS = [
  columnHelper.accessor('node.extrinsicHash', {
    id: 'tx-hash',
    header: 'Hash',
    cell: (props) => (
      <LinkWithCopy
        href={getReversibleTransactionHref(
          props.row.original.node.status,
          props.row.original.node.txId
        )}
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
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
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
  columnHelper.accessor('node.amount', {
    id: 'amount',
    header: 'Amount',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  }),
  columnHelper.accessor('node.status', {
    id: 'status',
    header: 'Status',
    cell: (props) => <TransactionStatus status={props.getValue()} />,
    enableSorting: true
  })
];
