import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { AccountTransaction } from '@/schemas';
import {
  formatMonetaryValue,
  formatTimestamp,
  formatTxAddress
} from '@/utils/formatter';

const columnHelper = createColumnHelper<AccountTransaction>();

export const ACCOUNT_TRANSACTION_COLUMNS = [
  columnHelper.accessor('node.extrinsicHash', {
    id: 'tx-hash',
    header: 'Hash',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.transactions}/${props.getValue()}`}
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
  columnHelper.accessor('node.fee', {
    id: 'fee',
    header: 'Fee',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  })
];
