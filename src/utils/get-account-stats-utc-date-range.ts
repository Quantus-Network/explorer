import { utc } from '@date-fns/utc';
import { endOfDay } from 'date-fns/endOfDay';
import { startOfDay } from 'date-fns/startOfDay';
import { subDays } from 'date-fns/subDays';

/** Inclusive lookback matching GetAccountsStats (`$startDate` = today − 7 days). */
export const ACCOUNT_STATS_LOOKBACK_DAYS = 7;

/**
 * UTC calendar-day bounds for `daily_active_account` rollup queries.
 *
 * Indexer rows are keyed at UTC midnight. Local `startOfToday()` bounds
 * (e.g. 07:00Z in America/Los_Angeles) exclude that first UTC bucket.
 */
export const getAccountStatsUtcDateRange = (now: Date = new Date()) => ({
  startDate: subDays(
    startOfDay(now, { in: utc }),
    ACCOUNT_STATS_LOOKBACK_DAYS
  ).toISOString(),
  endDate: endOfDay(now, { in: utc }).toISOString()
});
