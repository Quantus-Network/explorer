import type { Miner_Reward_Bool_Exp } from '@/__generated__/graphql';

function definedKeys(obj: object): string[] {
  return Object.keys(obj).filter(
    (k) => (obj as Record<string, unknown>)[k] != null
  );
}

/** Filter for rewards of one miner; keep in sync with `extractMinerId`. */
export function minerRewardsOfMiner(minerId: string): Miner_Reward_Bool_Exp {
  return { miner_id: { _eq: minerId } };
}

/** True when `where` has no predicates, so `chain_stats.total_miner_rewards` is the list total. */
export function isUnfilteredMinerRewards(
  where?: Miner_Reward_Bool_Exp | null
): boolean {
  if (!where) return true;
  return definedKeys(where).length === 0;
}

/**
 * If `where` is exactly `{ miner_id: { _eq: <id> } }`, return that id so the list total
 * can come from `account_stats.total_mined_blocks`. Anything else returns null.
 */
export function extractMinerId(
  where?: Miner_Reward_Bool_Exp | null
): string | null {
  if (!where) return null;
  const keys = definedKeys(where);
  if (keys.length !== 1 || keys[0] !== 'miner_id') return null;

  const comparison = where.miner_id;
  if (!comparison || definedKeys(comparison).length !== 1) return null;

  return typeof comparison._eq === 'string' ? comparison._eq : null;
}
