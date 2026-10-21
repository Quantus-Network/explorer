import type { Extrinsic_Bool_Exp } from '@/__generated__/graphql';

/**
 * Rolling window for homepage Active Accounts.
 * Same population as DailyChainStats.activeAccounts: distinct extrinsic signers.
 * Unsigned extrinsics (null signer) are excluded.
 */
export function last24HourActiveAccountsWhere(
  startDate: string,
  endDate: string
): Extrinsic_Bool_Exp {
  return {
    timestamp: { _gte: startDate, _lte: endDate },
    signer_id: { _is_null: false }
  };
}
