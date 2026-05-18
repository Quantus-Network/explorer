import { useMemo } from 'react';

import useApiClient from '@/api';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { MINER_LEADERBOARD_CHART_TOP_N } from '@/constants/miner-leaderboard-chart';
import { formatTxAddress } from '@/utils/formatter';

const getCssVar = (name: string) =>
  `hsl(${getComputedStyle(document.documentElement).getPropertyValue(name).trim()})`;

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

  const chartData = useMemo(() => {
    if (!data) return null;

    const total = data.blocks.totalCount ?? 0;
    const { topMiners } = data;
    const topBlocksSum = topMiners.reduce(
      (sum, m) => sum + (m.total_mined_blocks ?? 0),
      0
    );
    const othersBlocks = total - topBlocksSum;

    const labels = [
      ...topMiners.map((m) => formatTxAddress(m.id ?? '')),
      ...(othersBlocks > 0 ? ['Others'] : [])
    ];

    const values = [
      ...topMiners.map((m) => m.total_mined_blocks ?? 0),
      ...(othersBlocks > 0 ? [othersBlocks] : [])
    ];

    const chartColors = [
      getCssVar('--chart-1'),
      getCssVar('--chart-2'),
      getCssVar('--chart-3'),
      getCssVar('--chart-4'),
      getCssVar('--chart-5'),
      getCssVar('--chart-6'),
      getCssVar('--chart-7'),
      getCssVar('--chart-8'),
      getCssVar('--chart-9'),
      getCssVar('--chart-10')
    ];

    const backgroundColors = [
      ...topMiners.map((_, i) => chartColors[i % chartColors.length]),
      ...(othersBlocks > 0 ? [getCssVar('--muted-foreground')] : [])
    ];

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: backgroundColors,
          borderWidth: 0
        }
      ]
    };
  }, [data]);

  const dominantMiner = data?.topMiners[0] ?? null;
  const total = data?.blocks.totalCount ?? 0;

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
    chartData,
    dominantMiner,
    total,
    getStatus,
    error
  };
};
