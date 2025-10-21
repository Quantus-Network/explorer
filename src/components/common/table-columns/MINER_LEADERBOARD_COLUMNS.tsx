import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MinerStats } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';

const columnHelper = createColumnHelper<MinerStats>();

export const MINER_LEADERBOARD_COLUMNS = [
  columnHelper.accessor('id', {
    id: 'id',
    header: 'Miner',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={props.getValue() ?? '-'}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('totalMinedBlocks', {
    id: 'total_mined_blocks',
    header: 'Mined Blocks',
    cell: (props) => props.getValue(),
    enableSorting: true
  }),
  columnHelper.accessor('totalRewards', {
    id: 'total_rewards',
    header: 'Total Rewards',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  })
];
