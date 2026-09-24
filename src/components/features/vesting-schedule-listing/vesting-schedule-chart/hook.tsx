import { useMemo } from 'react';

import useApiClient from '@/api';
import { DATA_POOL_INTERVAL } from '@/constants/data-pool-interval';
import { TOKEN_DECIMALS } from '@/constants/token-decimals';
import {
  buildUnlockSeries,
  InvalidVestingScheduleError,
  type UnlockSeriesPoint,
  vestedAmount
} from '@/utils/vesting-schedule';

const TOKEN_FACTOR = BigInt(10) ** BigInt(TOKEN_DECIMALS);

export const plancksToChartAmount = (value: bigint) => {
  const whole = value / TOKEN_FACTOR;
  if (whole > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new InvalidVestingScheduleError(
      'unlocked amount is too large to chart'
    );
  }
  const fraction = value % TOKEN_FACTOR;
  return Number(whole) + Number(fraction) / Number(TOKEN_FACTOR);
};

export const useVestingScheduleChart = () => {
  const api = useApiClient();
  const {
    schedules,
    loading,
    error: fetchError
  } = api.vestingSchedules.useGetChartData({
    pollInterval: DATA_POOL_INTERVAL
  });

  const derived = useMemo(() => {
    if (!schedules) {
      return {
        series: [] as UnlockSeriesPoint[],
        amounts: [] as number[],
        unlockedNow: null as bigint | null,
        nowMs: null as number | null,
        error: undefined as Error | undefined
      };
    }

    try {
      const now = BigInt(Date.now());
      const series = buildUnlockSeries(schedules, now);
      return {
        series,
        amounts: series.map((point) => plancksToChartAmount(point.unlocked)),
        unlockedNow: schedules.reduce(
          (sum, schedule) => sum + vestedAmount(schedule, now),
          BigInt(0)
        ),
        nowMs: Number(now),
        error: undefined
      };
    } catch (error) {
      return {
        series: [] as UnlockSeriesPoint[],
        amounts: [] as number[],
        unlockedNow: null,
        nowMs: null,
        error:
          error instanceof Error ? error : new Error('Invalid vesting schedule')
      };
    }
  }, [schedules]);

  const error = !loading ? fetchError ?? derived.error : undefined;
  const success = !loading && !error && schedules !== undefined;

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
    series: error ? [] : derived.series,
    amounts: error ? [] : derived.amounts,
    nowMs: error ? null : derived.nowMs,
    unlockedNow: error ? null : derived.unlockedNow,
    getStatus,
    error
  };
};

export type VestingScheduleChartState = ReturnType<
  typeof useVestingScheduleChart
>;
