import type { AccountType } from '@/constants/account-types';

export interface AccountAddressClassification {
  isHighSecurity: boolean;
  isGuardian: boolean;
  isMultisig: boolean;
  /** Null when the indexer has no account row yet. */
  isDepositOnly: boolean | null;
  hasMinedBlocks: boolean;
}

/** Keep in sync with `accountTypeWhere` in `account-type-filter.ts`. */
export function classifyAccountAddress({
  isHighSecurity,
  isGuardian,
  isMultisig,
  isDepositOnly,
  hasMinedBlocks
}: AccountAddressClassification): AccountType {
  if (isMultisig) return 'multisig';
  if (isHighSecurity) return 'high_security';
  if (isGuardian) return 'guardian';
  if (isDepositOnly === true) {
    return hasMinedBlocks ? 'encrypted' : 'potential_encrypted';
  }

  return 'transparent';
}
