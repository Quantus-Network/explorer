import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import {
  MINER_DISTRIBUTION_COLORS,
  MINER_DISTRIBUTION_OTHERS_COLOR
} from '@/constants/miner-leaderboard-chart';
import { RESOURCES } from '@/constants/resources';
import { cn } from '@/lib/utils';
import type { MinerStats } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';

const columnHelper = createColumnHelper<MinerStats>();

const getRankClassName = (rank: number) => {
  switch (rank) {
    case 1:
      return 'text-flare';
    case 2:
      return 'text-rank-2';
    case 3:
      return 'text-rank-3';
    default:
      return 'text-muted-text';
  }
};

const getShareColor = (rank: number) => {
  if (rank >= 1 && rank <= MINER_DISTRIBUTION_COLORS.length) {
    return (
      MINER_DISTRIBUTION_COLORS[rank - 1] ?? MINER_DISTRIBUTION_OTHERS_COLOR
    );
  }
  return 'var(--border-strong)';
};

export type MinerLeaderboardColumnsOptions = {
  totalBlocks: number;
  maxSharePct: number;
};

export const getMinerLeaderboardColumns = ({
  totalBlocks,
  maxSharePct
}: MinerLeaderboardColumnsOptions) => [
  columnHelper.display({
    id: 'rank',
    header: 'Rank',
    cell: ({ row: { index }, table: { getState } }) => {
      const { pageIndex, pageSize } = getState().pagination;
      const rank = pageIndex * pageSize + (index + 1);

      return (
        <div
          className={cn(
            'w-8 font-mono text-xs text-center',
            getRankClassName(rank)
          )}
        >
          #{rank}
        </div>
      );
    },
    enableSorting: false,
    meta: {
      header: {
        className: 'justify-center'
      }
    }
  }),
  columnHelper.accessor('id', {
    id: 'miner',
    header: 'Miner',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={props.getValue() ?? '-'}
        truncate={false}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('total_mined_blocks', {
    id: 'total_mined_blocks',
    header: 'Blocks Mined',
    cell: (props) => (
      <span className="font-mono">
        {(props.getValue() ?? 0).toLocaleString()}
      </span>
    ),
    enableSorting: false
  }),
  columnHelper.display({
    id: 'share',
    header: 'Share',
    cell: ({ row: { index, original }, table: { getState } }) => {
      const { pageIndex, pageSize } = getState().pagination;
      const rank = pageIndex * pageSize + (index + 1);
      const blocks = original.total_mined_blocks ?? 0;
      const pct = totalBlocks > 0 ? (blocks / totalBlocks) * 100 : 0;
      const barWidth =
        maxSharePct > 0 ? Math.min(100, (pct / maxSharePct) * 100) : 0;

      return (
        <div className="flex items-center gap-2">
          <div className="h-1 w-[120px] bg-border-strong">
            <div
              className="h-full"
              style={{
                width: `${barWidth}%`,
                backgroundColor: getShareColor(rank)
              }}
            />
          </div>
          <span className="font-mono text-muted-text">{pct.toFixed(1)}%</span>
        </div>
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('total_rewards', {
    id: 'total_rewards',
    header: 'Total Rewards',
    cell: (props) => (
      <span className="font-mono">
        {formatMonetaryValue(props.getValue(), 5)}
      </span>
    ),
    enableSorting: false
  })
];
