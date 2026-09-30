import type { DailyChainStatRow } from '@/schemas';
import { HOME_STATS_DAY_COUNT } from '@/utils/get-home-stats-day-windows';

const DAY_MS = 24 * 60 * 60 * 1000;

const emptyDay = (id: string): DailyChainStatRow => ({
  id,
  date: `${id}T00:00:00.000Z`,
  blocks_count: 0,
  tx_count: 0,
  active_accounts: 0,
  transferred_amount: '0'
});

/**
 * Oldest → newest completed UTC days.
 * The current UTC day is still accumulating, so it is left off the sparkline.
 * Missing days in that window are padded with zeros.
 */
export const alignDailyStats = (
  rows: DailyChainStatRow[] | undefined,
  now: Date
): DailyChainStatRow[] => {
  const byId = new Map((rows ?? []).map((row) => [row.id, row]));
  const todayUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  return Array.from({ length: HOME_STATS_DAY_COUNT }, (_, index) => {
    const daysBeforeToday = HOME_STATS_DAY_COUNT - index;
    const id = new Date(todayUtc - daysBeforeToday * DAY_MS)
      .toISOString()
      .slice(0, 10);
    return byId.get(id) ?? emptyDay(id);
  });
};
