/** Fields used to derive explorer “Total Transactions” from chain_stats. */
export interface ChainTransferTotals {
  total_immediate_transfers: number;
  total_scheduled_transfers: number;
  total_executed_transfers: number;
  total_cancelled_transfers: number;
}

/** Immediate + reversible lifecycle counts (excludes miner rewards once immediate is fixed). */
export function sumChainTransferTotals(
  stats: ChainTransferTotals | null | undefined
): number {
  if (!stats) return 0;
  return (
    (stats.total_immediate_transfers ?? 0) +
    (stats.total_scheduled_transfers ?? 0) +
    (stats.total_executed_transfers ?? 0) +
    (stats.total_cancelled_transfers ?? 0)
  );
}
