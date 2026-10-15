import {
  MINTING_ADDRESS,
  MINTING_ADDRESS_FROM_LABEL,
  MINTING_ADDRESS_TYPE_LABEL
} from '@/constants/minting-address';
import {
  VESTING_CONTRACT_ADDRESS,
  VESTING_CONTRACT_TYPE_LABEL
} from '@/constants/vesting-contract-address';
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
 * Display label for an account type. The minting address and the vesting
 * contract are labeled on their own; account-type filters still classify
 * them from their flags.
 */
export function accountAddressTypeLabel(
  address: string,
  classification: AccountAddressClassification
): string {
  if (address === MINTING_ADDRESS) return MINTING_ADDRESS_TYPE_LABEL;
  if (address === VESTING_CONTRACT_ADDRESS) return VESTING_CONTRACT_TYPE_LABEL;
  return classifyAccountAddress(classification);
}
