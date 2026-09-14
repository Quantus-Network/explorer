import type { OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useEffect } from 'react';

import {
  isBrowsablePage,
  maxBrowsablePageIndex
} from '@/utils/browsable-page-depth';

interface BrowsablePageDepthArgs {
  currentPageIndex: number;
  limit: number;
  handleChangePagination: OnChangeFn<PaginationState>;
}

/**
 * Keeps OFFSET-paginated lists within {@link MAX_BROWSABLE_ROWS}.
 *
 * The page comes from the URL, so a stale link or a hand-edited `?page=` can
 * point past the browsable depth. When that happens the caller should skip
 * its query (`beyondDepth`), and this hook rewrites the URL to the deepest
 * browsable page so the next render fetches something Hasura can serve fast.
 */
export const useBrowsablePageDepth = ({
  currentPageIndex,
  limit,
  handleChangePagination
}: BrowsablePageDepthArgs) => {
  const beyondDepth = !isBrowsablePage(currentPageIndex, limit);

  useEffect(() => {
    if (!beyondDepth) return;
    handleChangePagination({
      pageIndex: maxBrowsablePageIndex(limit),
      pageSize: limit
    });
  }, [beyondDepth, limit, handleChangePagination]);

  return { beyondDepth };
};
