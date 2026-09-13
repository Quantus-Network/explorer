import { endOfDay } from 'date-fns/endOfDay';
import { startOfDay } from 'date-fns/startOfDay';
import { subDays } from 'date-fns/subDays';

import {
  ACCOUNT_STATS_LOOKBACK_DAYS,
  getAccountStatsUtcDateRange
} from './get-account-stats-utc-date-range';

const originalTz = process.env.TZ;

describe('getAccountStatsUtcDateRange', () => {
  beforeAll(() => {
    process.env.TZ = 'America/Los_Angeles';
  });

  afterAll(() => {
    if (originalTz === undefined) {
      delete process.env.TZ;
    } else {
      process.env.TZ = originalTz;
    }
  });

  it('uses UTC calendar-day bounds so the first UTC bucket is not dropped in PDT', () => {
    // Sunday 13 Sep 2026, 12:00 PDT (UTC−7).
    const now = new Date('2026-09-13T19:00:00.000Z');

    expect(now.getTimezoneOffset()).toBe(420);

    const utcBucketStart = '2026-09-06T00:00:00.000Z';
    const localLookbackStart = subDays(
      startOfDay(now),
      ACCOUNT_STATS_LOOKBACK_DAYS
    ).toISOString();
    const localLookbackEnd = endOfDay(now).toISOString();

    // Local PDT midnight is 07:00Z, so a local _gte would exclude the whole
    // 2026-09-06 UTC rollup bucket (00:00Z) that daily_active_account stores.
    expect(localLookbackStart).toBe('2026-09-06T07:00:00.000Z');
    expect(localLookbackEnd).toBe('2026-09-14T06:59:59.999Z');
    expect(utcBucketStart < localLookbackStart).toBe(true);

    const { startDate, endDate } = getAccountStatsUtcDateRange(now);

    expect(startDate).toBe(utcBucketStart);
    expect(endDate).toBe('2026-09-13T23:59:59.999Z');
    expect(startDate <= utcBucketStart).toBe(true);
    expect(endDate >= '2026-09-13T00:00:00.000Z').toBe(true);
  });
});
