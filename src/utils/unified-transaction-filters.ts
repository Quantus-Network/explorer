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

/** True when where is exactly the global exclude-rewards filter (no extra predicates). */
export function isUnfilteredExcludeRewards(
  where?: Unified_Transaction_Bool_Exp
): boolean {
  if (!where) return true;
  return where === EXCLUDE_REWARD_TRANSFERS;
}

function isExcludeRewardsClause(
  clause: Unified_Transaction_Bool_Exp | null | undefined
): boolean {
  if (!clause?._not?._and || clause._not._and.length !== 2) return false;
  const parts = clause._not._and;
  const hasImmediate = parts.some((p) => p?.type?._eq === 'IMMEDIATE');
  const hasNullHash = parts.some((p) => p?.hash?._is_null === true);
  return hasImmediate && hasNullHash;
}

function definedKeys(obj: object): string[] {
  return Object.keys(obj).filter(
    (k) => (obj as Record<string, unknown>)[k] != null
  );
}

/**
 * If `where` is exclude-rewards + from/to party filter for one account, return that id.
 * Otherwise null (block filters, mismatched ids, unfiltered, etc.).
 */
export function extractAccountPartyId(
  where?: Unified_Transaction_Bool_Exp
): string | null {
  if (!where) return null;

  let partyWhere: Unified_Transaction_Bool_Exp = where;

  if (where._and && Array.isArray(where._and) && where._and.length === 2) {
    const [first, second] = where._and;
    if (!isExcludeRewardsClause(first) || !second) return null;
    if (definedKeys(where).length !== 1) return null;
    partyWhere = second;
  } else if (isExcludeRewardsClause(where)) {
    return null;
  }

  if (definedKeys(partyWhere).length !== 1 || !partyWhere._or) return null;
  if (!Array.isArray(partyWhere._or) || partyWhere._or.length !== 2) {
    return null;
  }

  let fromId: string | undefined;
  let toId: string | undefined;

  for (const clause of partyWhere._or) {
    if (!clause || definedKeys(clause).length !== 1) return null;
    const fromEq = clause.from?.id?._eq;
    const toEq = clause.to?.id?._eq;
    if (typeof fromEq === 'string' && clause.from && !clause.to) {
      if (definedKeys(clause.from).length !== 1) return null;
      if (!clause.from.id || definedKeys(clause.from.id).length !== 1) {
        return null;
      }
      fromId = fromEq;
    } else if (typeof toEq === 'string' && clause.to && !clause.from) {
      if (definedKeys(clause.to).length !== 1) return null;
      if (!clause.to.id || definedKeys(clause.to.id).length !== 1) {
        return null;
      }
      toId = toEq;
    } else {
      return null;
    }
  }

  if (!fromId || !toId || fromId !== toId) return null;
  return fromId;
}
