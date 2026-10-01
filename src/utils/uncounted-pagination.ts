/**
 * Filtered lists skip the total count (a filtered aggregate is too slow), so
 * they request one row past the page size to learn whether a next page exists.
 */
export const peekedLimit = (limit: number) => limit + 1;

export function takePeekedPage<T>(
  rows: readonly T[],
  limit: number
): { rows: T[]; hasNextPage: boolean } {
  if (limit <= 0) {
    throw new RangeError(`page size must be positive, got ${limit}`);
  }
  return {
    rows: rows.slice(0, limit),
    hasNextPage: rows.length > limit
  };
}

/** Row count to hand the table so its pager allows exactly one more page when one exists. */
export function uncountedRowCount({
  pageIndex,
  limit,
  pageRowCount,
  hasNextPage
}: {
  pageIndex: number;
  limit: number;
  pageRowCount: number;
  hasNextPage: boolean;
}): number {
  return pageIndex * limit + pageRowCount + (hasNextPage ? 1 : 0);
}
