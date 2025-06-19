import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/link-with-copy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/text-with-copy';
import { RESOURCES } from '@/constants/resources';
import type { Transaction } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';
import { truncateWallet } from '@/utils/truncate-wallet';

const columnHelper = createColumnHelper<Transaction>();

export const TRANSACTION_COLUMNS = [
  columnHelper.accessor('id', {
    id: 'tx-id',
    header: 'Transaction ID',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.transactions}/${props.getValue()}`}
        text={props.getValue()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('extrinsicHash', {
    id: 'tx-hash',
    header: 'Transaction Hash',
    cell: (props) => (
      <TextWithCopy
        text={truncateWallet(props.getValue() ?? '-')}
        textCopy={props.getValue() ?? ''}
      />
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
    cell: (props) => formatTimestamp(props.getValue()),
    enableSorting: true
  }),
  columnHelper.accessor('from.id', {
    id: 'from',
    header: 'From',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={truncateWallet(props.getValue())}
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
        text={truncateWallet(props.getValue())}
        textCopy={props.getValue()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    header: 'Amount',
    cell: (props) => `${props.getValue()}`,
    enableSorting: true
  }),
  columnHelper.accessor('fee', {
    id: 'fee',
    header: 'Fee',
    cell: (props) => `${props.getValue()}`,
    enableSorting: true
  })
];
