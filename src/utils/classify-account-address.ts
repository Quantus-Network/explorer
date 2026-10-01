export const TRANSPARENT_ADDRESS_LABEL = 'Transparent Address';
export const POTENTIAL_ENCRYPTED_ADDRESS_LABEL = 'Potential Encrypted Address';
export const ENCRYPTED_ADDRESS_LABEL = 'Encrypted Address';

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
}: AccountAddressClassification): string {
  const isStandard = !isHighSecurity && !isGuardian && !isMultisig;

  if (isStandard && isDepositOnly === true) {
    return hasMinedBlocks
      ? ENCRYPTED_ADDRESS_LABEL
      : POTENTIAL_ENCRYPTED_ADDRESS_LABEL;
  }

  return TRANSPARENT_ADDRESS_LABEL;
}
