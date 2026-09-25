import {
  buildUnlockSeries,
  InvalidVestingScheduleError,
  vestedAmount
} from './vesting-schedule';

const b = (value: number) => BigInt(value);

/** pallet_vesting test schedule: start 100_000, cliff 200_000, end 500_000, total 10_000_000. */
const chain = {
  start: '100000',
  cliff: '200000',
  end: '500000',
  total: '10000000'
};

describe('vestedAmount', () => {
  it('is 0 before the cliff, including at start', () => {
    expect(vestedAmount(chain, b(0))).toBe(b(0));
    expect(vestedAmount(chain, b(100000))).toBe(b(0));
    expect(vestedAmount(chain, b(199999))).toBe(b(0));
  });

  it('jumps to the amount accrued since start at the cliff', () => {
    expect(vestedAmount(chain, b(200000))).toBe(b(2500000));
  });

  it('vests linearly from start to end after the cliff', () => {
    expect(vestedAmount(chain, b(300000))).toBe(b(5000000));
    expect(vestedAmount(chain, b(400000))).toBe(b(7500000));
    expect(vestedAmount(chain, b(499999))).toBe(b(9999975));
  });

  it('is the full total at and after the end', () => {
    expect(vestedAmount(chain, b(500000))).toBe(b(10000000));
    expect(vestedAmount(chain, b(900000))).toBe(b(10000000));
  });

  it('floors partial quanta', () => {
    const partial = { start: '0', cliff: '0', end: '3', total: '100' };
    expect(vestedAmount(partial, b(1))).toBe(b(33));
    expect(vestedAmount(partial, b(2))).toBe(b(66));
    expect(vestedAmount(partial, b(3))).toBe(b(100));
  });

  it('is pure linear when start and cliff are the same', () => {
    const linear = {
      start: '100000',
      cliff: '100000',
      end: '500000',
      total: '10000000'
    };
    expect(vestedAmount(linear, b(100000))).toBe(b(0));
    expect(vestedAmount(linear, b(100001))).toBe(b(25));
  });

  it('unlocks the full total when cliff and end are the same instant', () => {
    const instant = {
      start: '100000',
      cliff: '500000',
      end: '500000',
      total: '10000000'
    };
    expect(vestedAmount(instant, b(499999))).toBe(b(0));
    expect(vestedAmount(instant, b(500000))).toBe(b(10000000));
  });

  it('rejects a schedule the pallet would reject', () => {
    expect(() =>
      vestedAmount(
        { start: '300000', cliff: '200000', end: '500000', total: '100' },
        b(0)
      )
    ).toThrow(InvalidVestingScheduleError);
    expect(() =>
      vestedAmount(
        { start: '100000', cliff: '100000', end: '100000', total: '100' },
        b(0)
      )
    ).toThrow(InvalidVestingScheduleError);
  });
});

describe('buildUnlockSeries', () => {
  const early = {
    start: '0',
    cliff: '1000',
    end: '3000',
    total: '3000'
  };
  const late = {
    start: '1000',
    cliff: '2000',
    end: '4000',
    total: '3000'
  };

  it('jumps at each cliff to the accrued total, then finishes at each end', () => {
    expect(buildUnlockSeries([early, late], b(2500))).toEqual([
      { t: 0, unlocked: b(0) },
      { t: 1000, unlocked: b(0) },
      { t: 1000, unlocked: b(1000) },
      { t: 2000, unlocked: b(2000) },
      { t: 2000, unlocked: b(3000) },
      { t: 2500, unlocked: b(4000) },
      { t: 3000, unlocked: b(5000) },
      { t: 4000, unlocked: b(6000) }
    ]);
  });

  it('samples one point per day across the vest', () => {
    const day = 86_400_000;
    const schedule = {
      start: '0',
      cliff: '0',
      end: String(day * 3),
      total: '3000'
    };

    expect(buildUnlockSeries([schedule], b(day))).toEqual([
      { t: 0, unlocked: b(0) },
      { t: day, unlocked: b(1000) },
      { t: day * 2, unlocked: b(2000) },
      { t: day * 3, unlocked: b(3000) }
    ]);
  });

  it('returns an empty series when there are no schedules', () => {
    expect(buildUnlockSeries([], b(1000))).toEqual([]);
  });

  it('rejects the series when any schedule is invalid', () => {
    expect(() =>
      buildUnlockSeries(
        [early, { start: '5000', cliff: '1000', end: '1000', total: '1' }],
        b(1000)
      )
    ).toThrow(InvalidVestingScheduleError);
  });
});
