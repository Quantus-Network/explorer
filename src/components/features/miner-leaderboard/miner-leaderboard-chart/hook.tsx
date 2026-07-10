import { useMemo } from 'react';

import useApiClient from '@/api';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import {
  MINER_DISTRIBUTION_COLORS,
  MINER_DISTRIBUTION_OTHERS_COLOR,
  MINER_LEADERBOARD_CHART_LEGEND_N,
  MINER_LEADERBOARD_CHART_TOP_N
} from '@/constants/miner-leaderboard-chart';
import { formatTxAddress } from '@/utils/formatter';

export type DistributionSegment = {
  id: string | null;
  label: string;
  blocks: number;
  pct: number;
  color: string;
};

export const useMinerLeaderboardChart = () => {
  const api = useApiClient();

  const {
    loading,
    data,
    error: fetchError
  } = api.minerLeaderboard.useGetChartData({
    pollInterval: DATA_POOL_INTERVAL,
    variables: { limit: MINER_LEADERBOARD_CHART_TOP_N }
  });

  const { segments, legendItems, total } = useMemo(() => {
    if (!data) {
      return {
        segments: [] as DistributionSegment[],
        legendItems: [],
        total: 0
      };
    }

    const totalBlocks = data.blocks.totalCount ?? 0;
    const { topMiners } = data;
    const topBlocksSum = topMiners.reduce(
      (sum, m) => sum + (m.total_mined_blocks ?? 0),
      0
    );
    const othersBlocks = Math.max(0, totalBlocks - topBlocksSum);

    const minerSegments: DistributionSegment[] = topMiners.map((m, i) => {
      const blocks = m.total_mined_blocks ?? 0;
      return {
        id: m.id ?? null,
        label: formatTxAddress(m.id ?? ''),
        blocks,
        pct: totalBlocks > 0 ? (blocks / totalBlocks) * 100 : 0,
        color:
          MINER_DISTRIBUTION_COLORS[i % MINER_DISTRIBUTION_COLORS.length] ??
          MINER_DISTRIBUTION_OTHERS_COLOR
      };
    });

    const othersSegment: DistributionSegment | null =
      othersBlocks > 0
        ? {
            id: null,
            label: 'Others',
            blocks: othersBlocks,
            pct: totalBlocks > 0 ? (othersBlocks / totalBlocks) * 100 : 0,
            color: MINER_DISTRIBUTION_OTHERS_COLOR
          }
        : null;

    const allSegments = othersSegment
      ? [...minerSegments, othersSegment]
      : minerSegments;

    const legendItems = [
      ...minerSegments.slice(0, MINER_LEADERBOARD_CHART_LEGEND_N),
      ...(othersSegment ? [othersSegment] : [])
    ];

    return {
      segments: allSegments,
      legendItems,
      total: totalBlocks
    };
  }, [data]);

  const success = !loading && !fetchError;
  const error = !loading && fetchError;

  const getStatus = () => {
    switch (true) {
      case success:
        return 'success';
      case !!error:
        return 'error';
      case !!loading:
        return 'loading';
      default:
        return 'idle';
    }
  };

  return {
    segments,
    legendItems,
    total,
    getStatus,
    error
  };
};
