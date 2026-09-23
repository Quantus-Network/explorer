import type { SearchAllResponse } from '@/schemas/searchs';

import { getTransactionSearchPath } from './get-top-search-result-path';

type SearchTransaction = SearchAllResponse['transactions'][number];

/**
 * A batch is indexed as one unified_transaction row per transfer. Those rows
 * open the same detail page, so search should list the batch once.
 */
export function collapseSearchTransactions(
  transactions: SearchTransaction[]
): SearchTransaction[] {
  const seen = new Set<string>();

  return transactions.filter((tx) => {
    const path = getTransactionSearchPath(tx);
    if (seen.has(path)) return false;
    seen.add(path);
    return true;
  });
}
