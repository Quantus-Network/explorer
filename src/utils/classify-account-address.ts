import {
  ACCOUNT_TYPE_LABELS,
  type AccountType
} from '@/constants/account-types';

export interface AccountAddressClassification {
  isHighSecurity: boolean;
  isGuardian: boolean;
  isMultisig: boolean;
  /** Null when the indexer has no account row yet. */
  isDepositOnly: boolean | null;
  hasMinedBlocks: boolean;
}

function classifyAddressType({
  isDepositOnly,
  hasMinedBlocks
}: AccountAddressClassification): AccountType {
  if (isDepositOnly === true) {
    return hasMinedBlocks ? 'encrypted' : 'potential_encrypted';
  }

  return 'transparent';
}

/** Keep in sync with `accountTypeWhere` in `account-type-filter.ts`. */
export function classifyAccountAddress(
  account: AccountAddressClassification
): AccountType {
  if (account.isMultisig) return 'multisig';
  if (account.isHighSecurity) return 'high_security';
  if (account.isGuardian) return 'guardian';

  return classifyAddressType(account);
}

export function accountTypeLabel(account: AccountAddressClassification) {
  const type = classifyAccountAddress(account);
  const label = ACCOUNT_TYPE_LABELS[type];

  return type === 'guardian'
    ? `${label} (${ACCOUNT_TYPE_LABELS[classifyAddressType(account)]})`
    : label;
}
