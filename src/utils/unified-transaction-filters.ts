import type { Unified_Transaction_Bool_Exp } from '@/__generated__/graphql';

/** Hashless IMMEDIATE rows are miner/treasury rewards, not user transactions. */
export const EXCLUDE_REWARD_TRANSFERS = {
  _not: {
    _and: [{ type: { _eq: 'IMMEDIATE' } }, { hash: { _is_null: true } }]
  }
} as const satisfies Unified_Transaction_Bool_Exp;

export function withExcludedRewardTransfers(
  where?: Unified_Transaction_Bool_Exp
): Unified_Transaction_Bool_Exp {
  if (!where) return EXCLUDE_REWARD_TRANSFERS;
  return { _and: [EXCLUDE_REWARD_TRANSFERS, where] };
}
