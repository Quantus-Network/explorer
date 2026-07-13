import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { Block } from '@/schemas';
import { formatMonetaryValue, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<Block>();

export const BLOCK_COLUMNS = [
  columnHelper.accessor('height', {
    id: 'height',
    header: 'Height',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.blocks}/${props.getValue()}`}
        text={props.getValue().toString()}
        className="font-mono text-flare"
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('hash', {
    id: 'hash',
    header: 'Hash',
    cell: (props) => {
      const hash = props.getValue();
      return (
        <LinkWithCopy
          href={`${RESOURCES.blocks}/${hash}`}
          text={formatTxAddress(hash)}
          textCopy={hash}
        />
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor((row) => row.extrinsics.length, {
    id: 'extrinsicsCount',
    header: 'Txs',
    cell: (props) => (
      <span className="font-mono text-muted-text">{props.getValue()}</span>
    ),
    enableSorting: true
  }),
  columnHelper.accessor('reward', {
    id: 'reward',
    header: 'Reward',
    cell: (props) => (
      <span className="font-mono">{formatMonetaryValue(props.getValue())}</span>
    ),
    enableSorting: true
  }),
  columnHelper.accessor('mined_by_id', {
    id: 'miner',
    header: 'Miner',
    cell: (props) => {
      const id = props.getValue();
      if (!id) return <span className="font-mono text-muted-text">—</span>;
      return (
        <LinkWithCopy
          href={`${RESOURCES.accounts}/${id}`}
          text={formatTxAddress(id)}
          textCopy={id}
          className="font-mono text-flare"
        />
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Time',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
