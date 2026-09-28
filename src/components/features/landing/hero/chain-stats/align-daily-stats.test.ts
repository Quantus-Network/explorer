import type { DailyChainStatRow } from '@/schemas';

import { alignDailyStats } from './align-daily-stats';

const NOW = new Date('2026-09-28T15:30:00.000Z');

const row = (
  id: string,
  counts: Pick<
    DailyChainStatRow,
    'blocks_count' | 'tx_count' | 'active_accounts'
  >
): DailyChainStatRow => ({
  id,
  date: `${id}T00:00:00.000Z`,
  ...counts
});

describe('alignDailyStats', () => {
  it('omits the in-progress UTC day so the newest point is a full day', () => {
    const aligned = alignDailyStats(
      [
        row('2026-09-28', {
          blocks_count: 40,
          tx_count: 12,
          active_accounts: 3
        }),
        row('2026-09-27', {
          blocks_count: 7200,
          tx_count: 1400,
          active_accounts: 80
        }),
        row('2026-09-21', {
          blocks_count: 7100,
          tx_count: 1300,
          active_accounts: 70
        })
      ],
      NOW
    );

    expect(aligned.map((day) => day.id)).toEqual([
      '2026-09-21',
      '2026-09-22',
      '2026-09-23',
      '2026-09-24',
      '2026-09-25',
      '2026-09-26',
      '2026-09-27'
    ]);
    expect(aligned.at(-1)).toMatchObject({
      id: '2026-09-27',
      tx_count: 1400
    });
    expect(aligned[1]).toEqual({
      id: '2026-09-22',
      date: '2026-09-22T00:00:00.000Z',
      blocks_count: 0,
      tx_count: 0,
      active_accounts: 0
    });
  });
});
