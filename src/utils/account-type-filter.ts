import type {
  Account_Bool_Exp,
  Unified_Transaction_Bool_Exp
} from '@/__generated__/graphql';
import {
  ACCOUNT_TYPES,
  type AccountType,
  type AccountTypeFilterRule,
  FILTER_OPERATORS,
  type FilterOperator
} from '@/constants/account-types';
import { withExcludedRewardTransfers } from '@/utils/unified-transaction-filters';

const STANDARD_ACCOUNT = {
  is_high_security: { _eq: false },
  is_guardian: { _eq: false },
  is_multisig: { _eq: false }
} as const satisfies Account_Bool_Exp;

/**
 * Flags take priority: flagged accounts only match their flag types, and the
 * three address types only match unflagged accounts.
 * Keep in sync with `classifyAccountAddress`.
 */
export function accountTypeWhere(type: AccountType): Account_Bool_Exp {
  switch (type) {
    case 'transparent':
      return { ...STANDARD_ACCOUNT, is_deposit_only: { _eq: false } };
    case 'potential_encrypted':
      return {
        ...STANDARD_ACCOUNT,
        is_deposit_only: { _eq: true },
        has_mined_blocks: { _eq: false }
      };
    case 'encrypted':
      return {
        ...STANDARD_ACCOUNT,
        is_deposit_only: { _eq: true },
        has_mined_blocks: { _eq: true }
      };
    case 'high_security':
      return { is_high_security: { _eq: true } };
    case 'guardian':
      return { is_guardian: { _eq: true } };
    case 'multisig':
      return { is_multisig: { _eq: true } };
    default: {
      const unhandled: never = type;
      throw new Error(`Unhandled account type: ${String(unhandled)}`);
    }
  }
}

function anyAccountTypeWhere(types: readonly AccountType[]): Account_Bool_Exp {
  return { _or: types.map(accountTypeWhere) };
}

/** Account filter for one rule; null while the rule has no types selected. */
export function accountTypeRuleWhere(
  rule: AccountTypeFilterRule
): Account_Bool_Exp | null {
  if (rule.types.length === 0) return null;
  const anyType = anyAccountTypeWhere(rule.types);
  return rule.operator === 'is' ? anyType : { _not: anyType };
}

function partyRuleWhere(
  party: 'from' | 'to',
  rule: AccountTypeFilterRule | undefined
): Unified_Transaction_Bool_Exp | null {
  if (!rule || rule.types.length === 0) return null;
  const partyMatches = { [party]: anyAccountTypeWhere(rule.types) };
  // `_not` around the relationship (rather than inside it) keeps rows without that party, e.g. mints.
  return rule.operator === 'is' ? partyMatches : { _not: partyMatches };
}

/** Transaction filter for sender / receiver account-type rules; null when no rule narrows results. */
export function partyAccountTypeRulesWhere(rules: {
  from?: AccountTypeFilterRule;
  to?: AccountTypeFilterRule;
}): Unified_Transaction_Bool_Exp | null {
  const clauses = [
    partyRuleWhere('from', rules.from),
    partyRuleWhere('to', rules.to)
  ].filter((clause) => clause !== null);
  const [only, ...rest] = clauses;
  if (!only) return null;
  return rest.length === 0 ? only : { _and: clauses };
}

/**
 * Full `where` for a transaction table with sender / receiver rules applied;
 * null when no rule narrows results, so the table keeps its counted query.
 */
export function accountTypeFilteredTransactionsWhere(
  baseWhere: Unified_Transaction_Bool_Exp | undefined,
  rules: { from?: AccountTypeFilterRule; to?: AccountTypeFilterRule }
): Unified_Transaction_Bool_Exp | null {
  const partyWhere = partyAccountTypeRulesWhere(rules);
  if (!partyWhere) return null;
  return withExcludedRewardTransfers(
    baseWhere ? { _and: [baseWhere, partyWhere] } : partyWhere
  );
}

function isFilterOperator(value: string): value is FilterOperator {
  return (FILTER_OPERATORS as readonly string[]).includes(value);
}

function isAccountType(value: string): value is AccountType {
  return (ACCOUNT_TYPES as readonly string[]).includes(value);
}

function canonicalTypes(types: readonly AccountType[]): AccountType[] {
  return ACCOUNT_TYPES.filter((type) => types.includes(type));
}

/** Parses the `operator:type,type` URL form; null for anything malformed. */
export function parseAccountTypeFilterRule(
  value: string
): AccountTypeFilterRule | null {
  const separator = value.indexOf(':');
  if (separator === -1) return null;

  const operator = value.slice(0, separator);
  if (!isFilterOperator(operator)) return null;

  const list = value.slice(separator + 1);
  if (list === '') return { operator, types: [] };

  const parts = list.split(',');
  if (!parts.every(isAccountType)) return null;
  return { operator, types: canonicalTypes(parts) };
}

export function serializeAccountTypeFilterRule(
  rule: AccountTypeFilterRule
): string {
  return `${rule.operator}:${rule.types.join(',')}`;
}

export function toggleRuleType(
  rule: AccountTypeFilterRule,
  type: AccountType
): AccountTypeFilterRule {
  const types = rule.types.includes(type)
    ? rule.types.filter((t) => t !== type)
    : canonicalTypes([...rule.types, type]);
  return { ...rule, types };
}
