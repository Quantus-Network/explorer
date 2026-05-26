import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { Transaction } from '@/schemas';
import { getExtrinsicDetailPath } from '@/utils/get-extrinsic-detail-path';
import { formatMonetaryValue, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<Transaction>();

export const TRANSACTION_COLUMNS = [
  columnHelper.accessor('extrinsic.id', {
    id: 'tx-hash',
    header: 'Hash',
    cell: (props) => {
      const extrinsicId = props.getValue();
      const extrinsic = props.row.original.extrinsic;

      if (!extrinsicId || !extrinsic?.pallet || !extrinsic?.call) {
        return 'Is not available';
      }

      return (
        <LinkWithCopy
          href={getExtrinsicDetailPath({
            id: extrinsicId,
            pallet: extrinsic.pallet,
            call: extrinsic.call
          })}
          text={formatTxAddress(extrinsicId)}
          textCopy={extrinsicId}
        />
      );
    },
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
  columnHelper.accessor('amount', {
    id: 'amount',
    header: 'Amount',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  }),
  columnHelper.accessor('fee', {
    id: 'fee',
    header: 'Fee',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  })
];
