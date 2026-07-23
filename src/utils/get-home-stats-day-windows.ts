import { endOfDay } from 'date-fns/endOfDay';
import { format } from 'date-fns/format';
import { startOfDay } from 'date-fns/startOfDay';
import { startOfToday } from 'date-fns/startOfToday';
import { subDays } from 'date-fns/subDays';
import { useMemo } from 'react';

/** Number of daily sparkline points (inclusive of today). */
export const HOME_STATS_DAY_COUNT = 7;

export interface DayWindow {
  start: string;
  end: string;
  label: string;
}

/** Formats a day label like the mock: "Jun 11" (local timezone). */
export const formatHomeStatsDayLabel = (date: Date) => format(date, 'MMM d');

/** Formats a UTC calendar day as "Jun 11" regardless of viewer timezone. */
export const formatHomeStatsUtcDayLabel = (date: Date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ] as const;
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
};

/**
 * Builds 7 chronological day windows ending today (oldest → newest).
 * Local calendar days — kept for any callers that still need local windows.
 */
export const useHomeStatsDayWindows = (): DayWindow[] =>
  useMemo(() => {
    const today = startOfToday();

    return Array.from({ length: HOME_STATS_DAY_COUNT }, (_, index) => {
      const day = subDays(today, HOME_STATS_DAY_COUNT - 1 - index);
      return {
        start: startOfDay(day).toISOString(),
        end: endOfDay(day).toISOString(),
        label: formatHomeStatsDayLabel(day)
      };
    });
  }, []);
