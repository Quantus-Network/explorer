import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MinerReward } from '@/schemas';
import { formatMonetaryValue, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<MinerReward>();

export const MINER_REWARD_COLUMNS = [
  columnHelper.accessor('node.block.hash', {
    id: 'block_hash',
    header: 'Hash',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.minerRewards}/${props.getValue()}`}
        text={formatTxAddress(props.getValue() ?? '-')}
      />
    ),
    enableSorting: true
  }),
  columnHelper.accessor('node.block.height', {
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
  columnHelper.accessor('node.miner.id', {
    id: 'miner',
    header: 'Mined by',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={props.getValue()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('node.reward', {
    id: 'reward',
    header: 'Reward',
    cell: (props) => formatMonetaryValue(props.getValue()),
    enableSorting: true
  }),
  columnHelper.accessor('node.timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
