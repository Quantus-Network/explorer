import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { AccountMinerRewards } from '@/schemas';
import { formatMonetaryValue, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<AccountMinerRewards>();

export const ACCOUNT_MINER_REWARDS_COLUMNS = [
  columnHelper.accessor('node.block.hash', {
    id: 'node_block_hash',
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
    id: 'node_block_height',
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
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={props.getValue()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('node.reward', {
    id: 'from',
    header: 'From',
    cell: (props) => formatMonetaryValue(props.getValue()),
    enableSorting: true
  }),
  columnHelper.accessor('node.timestamp', {
    id: 'to',
    header: 'To',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
