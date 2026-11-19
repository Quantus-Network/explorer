import {
  KNOWN_ADDRESSES,
  MINTING_ADDRESS_FROM_LABEL
} from '@/constants/known-addresses';

const KNOWN_ADDRESS_TAGS = new Map<string, readonly string[]>(
  Object.values(KNOWN_ADDRESSES).map(({ address, tags }) => [address, tags])
);

/** Label for a From column, or null when the address should render as a normal account cell. */
export function fromAddressPlainLabel(address: string): string | null {
  if (address === KNOWN_ADDRESSES.minting.address) {
    return MINTING_ADDRESS_FROM_LABEL;
  }
  return null;
}

/** Tags for a known address; empty for every other address. */
export function knownAddressTags(address: string): readonly string[] {
  return KNOWN_ADDRESS_TAGS.get(address) ?? [];
}
