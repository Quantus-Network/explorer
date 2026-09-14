/**
 * Deepest OFFSET the explorer will request on unified_transaction lists.
 *
 * Hasura pages with OFFSET, whose cost grows linearly with depth: the
 * exclude-rewards list measured ~0.6 s at offset 50k and 4.7 s at 150k
 * (statement timeout is 5 s). Capping the pager at this many rows keeps every
 * reachable page comfortably under a second on hot lists.
 */
export const MAX_BROWSABLE_ROWS = 10_000;

/** Row count to hand the table so its pager stops at the browsable depth. */
export const browsableRowCount = (totalCount: number) =>
  Math.min(totalCount, MAX_BROWSABLE_ROWS);

/** True when the page's offset stays below {@link MAX_BROWSABLE_ROWS}. */
export const isBrowsablePage = (pageIndex: number, limit: number) =>
  pageIndex * limit < MAX_BROWSABLE_ROWS;

/** Last 0-based page index for which {@link isBrowsablePage} holds. */
export const maxBrowsablePageIndex = (limit: number) => {
  if (limit <= 0) {
    throw new RangeError(`page size must be positive, got ${limit}`);
  }
  return Math.ceil(MAX_BROWSABLE_ROWS / limit) - 1;
};
