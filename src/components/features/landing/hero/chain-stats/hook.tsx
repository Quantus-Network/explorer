import { useMemo } from 'react';

import useApiClient from '@/api';
import type { SparklinePoint } from '@/components/ui/composites/stat-sparkline-card';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { HomeChainStatsResponse } from '@/schemas';
import { formatHomeStatsUtcDayLabel } from '@/utils/get-home-stats-day-windows';
import { sumChainTransferTotals } from '@/utils/sum-chain-transfer-totals';

import { alignDailyStats } from './align-daily-stats';
import { formatChainSupply } from './format-chain-supply';
import { transferredAmountToChartValue } from './transferred-amount-chart-value';

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
  const { loading, data, error } = api.chainStatus.useGetHomeStats({
    pollInterval: DATA_POOL_INTERVAL
  });

  const status = data?.status;

  const depositAccounts = status?.total_deposit_accounts ?? 0;
  const totalAccounts = status?.total_accounts ?? 0;
  const activeAccounts = totalAccounts - depositAccounts;

  const totalTransactions = sumChainTransferTotals(status);
  const last24HourTransactions = data?.last24Hour?.aggregate?.count ?? 0;
  const last24HourTransferred =
    data?.last24HourTransferred?.aggregate?.sum?.amount ?? '0';

  const alignedDays = useMemo(
    () => alignDailyStats(data?.dailyStats, new Date()),
    [data?.dailyStats]
  );

  const dayLabels = useMemo(
    () =>
      alignedDays.map((row) => {
        const label = formatHomeStatsUtcDayLabel(new Date(row.date));
        return `${label} (UTC)`;
      }),
    [alignedDays]
  );

  const blocksPoints = useMemo(
    () =>
      toPoints(
        alignedDays.map((row) => row.blocks_count),
        dayLabels,
        (value) => `${value.toLocaleString()} blocks`
      ),
    [alignedDays, dayLabels]
  );

  const transfersPoints = useMemo(
    () =>
      toPoints(
        alignedDays.map((row) => row.tx_count),
        dayLabels,
        (value) => `${value.toLocaleString()} txs`
      ),
    [alignedDays, dayLabels]
  );

  const activeAccountsPoints = useMemo(
    () =>
      toPoints(
        alignedDays.map((row) => row.active_accounts),
        dayLabels,
        (value) => `${value.toLocaleString()} active`
      ),
    [alignedDays, dayLabels]
  );

  const transferredPoints = useMemo(
    () =>
      alignedDays.map((row, index) => ({
        value: transferredAmountToChartValue(row.transferred_amount),
        label: dayLabels[index] ?? '',
        displayValue: formatChainSupply(row.transferred_amount)
      })),
    [alignedDays, dayLabels]
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
    activeAccountsPoints,
    transferredPoints,
    totalTransferred: status?.total_transferred_amount,
    last24HourTransferred,
    maxSupply: status?.max_supply,
    totalSupply: status?.total_supply,
    circulatingSupply: status?.circulating_supply
  };
};

// Keep type import used for documentation / potential tests
export type { HomeChainStatsResponse };
