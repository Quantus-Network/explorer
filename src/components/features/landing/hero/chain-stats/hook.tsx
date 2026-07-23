import { useMemo } from 'react';

import useApiClient from '@/api';
import type { SparklinePoint } from '@/components/ui/composites/stat-sparkline-card';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import type { DailyChainStatRow, HomeChainStatsResponse } from '@/schemas';
import {
  formatHomeStatsUtcDayLabel,
  HOME_STATS_DAY_COUNT
} from '@/utils/get-home-stats-day-windows';
import { sumChainTransferTotals } from '@/utils/sum-chain-transfer-totals';

/** Oldest → newest, pad missing UTC days with zeros so sparklines stay 7 points. */
const alignDailyStats = (
  rows: DailyChainStatRow[] | undefined
): DailyChainStatRow[] => {
  const byId = new Map((rows ?? []).map((row) => [row.id, row]));
  const today = new Date();
  const todayUtc = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );

  return Array.from({ length: HOME_STATS_DAY_COUNT }, (_, index) => {
    const dayMs =
      todayUtc - (HOME_STATS_DAY_COUNT - 1 - index) * 24 * 60 * 60 * 1000;
    const day = new Date(dayMs);
    const id = day.toISOString().slice(0, 10);
    return (
      byId.get(id) ?? {
        id,
        date: `${id}T00:00:00.000Z`,
        blocks_count: 0,
        tx_count: 0,
        active_accounts: 0
      }
    );
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
  const { loading, data, error } = api.chainStatus.useGetHomeStats({
    pollInterval: DATA_POOL_INTERVAL
  });

  const status = data?.status;

  const depositAccounts = status?.total_deposit_accounts ?? 0;
  const totalAccounts = status?.total_accounts ?? 0;
  const activeAccounts = totalAccounts - depositAccounts;

  const totalTransactions = sumChainTransferTotals(status);
  const last24HourTransactions = data?.last24Hour?.aggregate?.count ?? 0;

  const alignedDays = useMemo(
    () => alignDailyStats(data?.dailyStats),
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

// Keep type import used for documentation / potential tests
export type { HomeChainStatsResponse };
