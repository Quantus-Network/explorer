import { takePeekedPage, uncountedRowCount } from './uncounted-pagination';

describe('takePeekedPage', () => {
  it('reports a next page and drops the peek row when the query returned limit + 1 rows', () => {
    expect(takePeekedPage([1, 2, 3, 4], 3)).toEqual({
      rows: [1, 2, 3],
      hasNextPage: true
    });
  });

  it('reports no next page when the query returned exactly limit rows', () => {
    expect(takePeekedPage([1, 2, 3], 3)).toEqual({
      rows: [1, 2, 3],
      hasNextPage: false
    });
  });

  it('reports no next page for a short last page', () => {
    expect(takePeekedPage([1], 3)).toEqual({ rows: [1], hasNextPage: false });
  });

  it('rejects a non-positive page size', () => {
    expect(() => takePeekedPage([1], 0)).toThrow(RangeError);
  });
});

describe('uncountedRowCount', () => {
  it('extends one row past the current page when a next page exists', () => {
    expect(
      uncountedRowCount({
        pageIndex: 2,
        limit: 25,
        pageRowCount: 25,
        hasNextPage: true
      })
    ).toBe(76);
  });

  it('ends at the last row of the current page when there is no next page', () => {
    expect(
      uncountedRowCount({
        pageIndex: 2,
        limit: 25,
        pageRowCount: 7,
        hasNextPage: false
      })
    ).toBe(57);
  });
});
