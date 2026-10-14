import {
  MINTING_ADDRESS,
  MINTING_ADDRESS_FROM_LABEL,
  MINTING_ADDRESS_TYPE_LABEL
} from '@/constants/minting-address';
import {
  type AccountAddressClassification,
  classifyAccountAddress
} from '@/utils/classify-account-address';

/** Label for a From column, or null when the address should render as a normal account cell. */
export function fromAddressPlainLabel(address: string): string | null {
  if (address === MINTING_ADDRESS) return MINTING_ADDRESS_FROM_LABEL;
  return null;
}

/**
 * Display label for an account type. The minting address is labeled on its own;
 * account-type filters still classify it from its flags.
 */
export function accountAddressTypeLabel(
  address: string,
  classification: AccountAddressClassification
): string {
  if (address === MINTING_ADDRESS) return MINTING_ADDRESS_TYPE_LABEL;
  return classifyAccountAddress(classification);
}
