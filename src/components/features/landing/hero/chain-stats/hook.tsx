import { useMemo } from 'react';

import useApiClient from '@/api';
import type { SparklinePoint } from '@/components/ui/composites/stat-sparkline-card';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { HomeChainStatsResponse } from '@/schemas';
import {
  HOME_STATS_DAY_COUNT,
  useHomeStatsDayWindows
} from '@/utils/get-home-stats-day-windows';

const seriesFromDays = (
  data: HomeChainStatsResponse | undefined,
  prefix: 'blocksDay' | 'transfersDay' | 'activeAccountsDay'
): number[] => {
  if (!data) return [];

  return Array.from({ length: HOME_STATS_DAY_COUNT }, (_, index) => {
    const key = `${prefix}${index}` as keyof HomeChainStatsResponse;
    const bucket = data[key] as HomeChainStatsResponse['blocksDay0'];
    return bucket?.aggregate?.count ?? 0;
  });
};

const toPoints = (
  values: number[],
  labels: string[],
  formatValue: (value: number) => string
): SparklinePoint[] =>
  values.map((value, index) => ({
    value,
    label: labels[index] ?? '',
    displayValue: formatValue(value)
  }));

export const useChainStats = () => {
  const api = useApiClient();
  const dayWindows = useHomeStatsDayWindows();
  const { loading, data, error } = api.chainStatus.useGetHomeStats({
    pollInterval: DATA_POOL_INTERVAL
  });

  const status = data?.status;

  const depositAccounts = status?.total_deposit_accounts ?? 0;
  const totalAccounts = status?.total_accounts ?? 0;
  const activeAccounts = totalAccounts - depositAccounts;

  const totalTransactions = data?.allTimeTransactions?.aggregate?.count ?? 0;

  const last24HourTransactions = data?.last24Hour?.aggregate?.count ?? 0;

  const dayLabels = useMemo(
    () => dayWindows.map((window) => window.label),
    [dayWindows]
  );

  const blocksPoints = useMemo(
    () =>
      toPoints(
        seriesFromDays(data, 'blocksDay'),
        dayLabels,
        (value) => `${value.toLocaleString()} blocks`
      ),
    [data, dayLabels]
  );

  const transfersPoints = useMemo(
    () =>
      toPoints(
        seriesFromDays(data, 'transfersDay'),
        dayLabels,
        (value) => `${value.toLocaleString()} txs`
      ),
    [data, dayLabels]
  );

  const activeAccountsPoints = useMemo(
    () =>
      toPoints(
        seriesFromDays(data, 'activeAccountsDay'),
        dayLabels,
        (value) => `${value.toLocaleString()} active`
      ),
    [data, dayLabels]
  );

  return {
    loading,
    error,
    blockHeight: status?.block_height,
    totalTransactions,
    last24HourTransactions,
    activeAccounts,
    totalAccounts,
    blocksPoints,
    transfersPoints,
    activeAccountsPoints
  };
};
