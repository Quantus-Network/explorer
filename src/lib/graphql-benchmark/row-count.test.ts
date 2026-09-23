import { benchmarkRowCount } from './row-count';

describe('benchmarkRowCount', () => {
  it('returns undefined when the payload has no arrays', () => {
    expect(benchmarkRowCount(undefined)).toBeUndefined();
    expect(benchmarkRowCount(null)).toBeUndefined();
    expect(benchmarkRowCount({ id: 'x' })).toBeUndefined();
  });

  it('counts the first top-level array for a single selection', () => {
    expect(benchmarkRowCount({ accountEvents: [1, 2], meta: { n: 1 } })).toBe(
      2
    );
  });

  it('sums every account alias', () => {
    expect(
      benchmarkRowCount({
        events0: [1],
        events1: [2, 3],
        events2: []
      })
    ).toBe(3);
  });
});
