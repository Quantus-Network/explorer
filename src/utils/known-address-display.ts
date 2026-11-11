import {
  KNOWN_ADDRESSES,
  MINTING_ADDRESS_FROM_LABEL
} from '@/constants/known-addresses';
import {
  type AccountAddressClassification,
  classifyAccountAddress
} from '@/utils/classify-account-address';

const KNOWN_ADDRESS_LABELS = new Map<string, string>(
  Object.values(KNOWN_ADDRESSES).map(({ address, label }) => [address, label])
);

/** Label for a From column, or null when the address should render as a normal account cell. */
export function fromAddressPlainLabel(address: string): string | null {
  if (address === KNOWN_ADDRESSES.minting.address) {
    return MINTING_ADDRESS_FROM_LABEL;
  }
  return null;
}

/**
 * Display label for an account type. Known addresses are labeled on their
 * own; account-type filters still classify them from their flags.
 */
export function accountAddressTypeLabel(
  address: string,
  classification: AccountAddressClassification
): string {
  return (
    KNOWN_ADDRESS_LABELS.get(address) ?? classifyAccountAddress(classification)
  );
}
