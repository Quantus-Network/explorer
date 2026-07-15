import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { Block } from '@/schemas';
import { formatBlockHeight, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<Block>();

export const RECENT_BLOCK_COLUMNS = [
  columnHelper.accessor('height', {
    id: 'height',
    header: 'Height',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.blocks}/${props.getValue()}`}
        text={formatBlockHeight(props.getValue())}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('hash', {
    id: 'hash',
    header: 'Hash',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.blocks}/${props.getValue()}`}
        text={formatTxAddress(props.getValue())}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor((row) => row.extrinsics.length, {
    id: 'Txs',
    header: 'Txs',
    cell: (props) => props.getValue(),
    enableSorting: true
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
