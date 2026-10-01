export const ACCOUNT_TYPES = [
  'transparent',
  'potential_encrypted',
  'encrypted',
  'high_security',
  'guardian',
  'multisig'
] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  transparent: 'Transparent',
  potential_encrypted: 'Potential Encrypted',
  encrypted: 'Encrypted',
  high_security: 'High Security',
  guardian: 'Guardian',
  multisig: 'Multisig'
};

export const FILTER_OPERATORS = ['is', 'is_not'] as const;
export type FilterOperator = (typeof FILTER_OPERATORS)[number];

export const FILTER_OPERATOR_LABELS: Record<FilterOperator, string> = {
  is: 'is',
  is_not: 'is not'
};

/** An empty `types` list is a filter that was added but does not narrow results yet. */
export interface AccountTypeFilterRule {
  operator: FilterOperator;
  types: readonly AccountType[];
}

/** Filterable account-type properties; each key is also its URL search param. */
export const ACCOUNT_TYPE_FILTER_KEYS = [
  'account_type',
  'from_type',
  'to_type'
] as const;
export type AccountTypeFilterKey = (typeof ACCOUNT_TYPE_FILTER_KEYS)[number];

export const ACCOUNT_TYPE_FILTER_LABELS: Record<AccountTypeFilterKey, string> =
  {
    account_type: 'Account type',
    from_type: 'From account type',
    to_type: 'To account type'
  };

export type AccountTypeFilters = Partial<
  Record<AccountTypeFilterKey, AccountTypeFilterRule>
>;
