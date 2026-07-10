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

/** Formats a day label like the mock: "Jun 11". */
export const formatHomeStatsDayLabel = (date: Date) => format(date, 'MMM d');

/**
 * Builds 7 chronological day windows ending today (oldest → newest).
 * Matches existing explorer date helpers (local calendar days).
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
