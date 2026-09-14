import {
  browsableRowCount,
  isBrowsablePage,
  MAX_BROWSABLE_ROWS,
  maxBrowsablePageIndex
} from './browsable-page-depth';

describe('browsableRowCount', () => {
  it('passes short lists through untouched', () => {
    expect(browsableRowCount(0)).toBe(0);
    expect(browsableRowCount(2_500)).toBe(2_500);
    expect(browsableRowCount(MAX_BROWSABLE_ROWS)).toBe(MAX_BROWSABLE_ROWS);
  });

  it('caps long lists so the pager never offers a deep OFFSET', () => {
    expect(browsableRowCount(238_833)).toBe(MAX_BROWSABLE_ROWS);
  });
});

describe('isBrowsablePage', () => {
  it('accepts every page whose offset stays below the cap', () => {
    expect(isBrowsablePage(0, 25)).toBe(true);
    expect(isBrowsablePage(MAX_BROWSABLE_ROWS / 25 - 1, 25)).toBe(true);
  });

  it('rejects the first page whose offset reaches the cap', () => {
    expect(isBrowsablePage(MAX_BROWSABLE_ROWS / 25, 25)).toBe(false);
    expect(isBrowsablePage(6_000, 25)).toBe(false);
  });
});

describe('maxBrowsablePageIndex', () => {
  it('is the last page index that isBrowsablePage accepts', () => {
    for (const limit of [25, 50, 75, 100, 33]) {
      const last = maxBrowsablePageIndex(limit);
      expect(isBrowsablePage(last, limit)).toBe(true);
      expect(isBrowsablePage(last + 1, limit)).toBe(false);
    }
  });

  it('refuses a non-positive page size instead of returning Infinity', () => {
    expect(() => maxBrowsablePageIndex(0)).toThrow(RangeError);
    expect(() => maxBrowsablePageIndex(-25)).toThrow(RangeError);
  });
});
