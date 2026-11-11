import {
  KNOWN_ADDRESSES,
  MINTING_ADDRESS_FROM_LABEL
} from '@/constants/known-addresses';
import { TRANSPARENT_ADDRESS_LABEL } from '@/utils/classify-account-address';

import {
  accountAddressTypeLabel,
  fromAddressPlainLabel
} from './known-address-display';

const MINTING_ADDRESS = KNOWN_ADDRESSES.minting.address;
const MINTING_ADDRESS_TYPE_LABEL = 'Minting Address';
const VESTING_CONTRACT_ADDRESS = KNOWN_ADDRESSES.vestingContract.address;
const VESTING_CONTRACT_TYPE_LABEL = 'Vesting Contract';
const NEAR_INTENTS_BRIDGE_ADDRESS =
  'qzmzw3Bf2sPHaqSZJnUmNJAYiD5DZosZ4xw1kZduqGGKePTDk';

const transparent = {
  isHighSecurity: false,
  isGuardian: false,
  isMultisig: false,
  isDepositOnly: false,
  hasMinedBlocks: false
};

describe('fromAddressPlainLabel', () => {
  it('replaces the minting address with the configured From label', () => {
    expect(fromAddressPlainLabel(MINTING_ADDRESS)).toBe(
      MINTING_ADDRESS_FROM_LABEL
    );
  });

  it('leaves every other address as a normal account cell', () => {
    expect(fromAddressPlainLabel(`${MINTING_ADDRESS}x`)).toBeNull();
    expect(fromAddressPlainLabel(VESTING_CONTRACT_ADDRESS)).toBeNull();
    expect(fromAddressPlainLabel(NEAR_INTENTS_BRIDGE_ADDRESS)).toBeNull();
  });
});

describe('accountAddressTypeLabel', () => {
  it('names the minting address as a minting address', () => {
    expect(accountAddressTypeLabel(MINTING_ADDRESS, transparent)).toBe(
      MINTING_ADDRESS_TYPE_LABEL
    );
  });

  it('names the vesting contract address as a vesting contract', () => {
    expect(accountAddressTypeLabel(VESTING_CONTRACT_ADDRESS, transparent)).toBe(
      VESTING_CONTRACT_TYPE_LABEL
    );
  });

  it('names the NEAR Intents bridge address as the NEAR Intents bridge', () => {
    expect(
      accountAddressTypeLabel(NEAR_INTENTS_BRIDGE_ADDRESS, transparent)
    ).toBe('NEAR Intents Bridge');
  });

  it('keeps Transparent Address for any other standard account', () => {
    expect(accountAddressTypeLabel(`${MINTING_ADDRESS}x`, transparent)).toBe(
      TRANSPARENT_ADDRESS_LABEL
    );
  });
});

describe('KNOWN_ADDRESSES', () => {
  it('gives every known address a single entry', () => {
    const addresses = Object.values(KNOWN_ADDRESSES).map(
      ({ address }) => address
    );

    expect(new Set(addresses).size).toBe(addresses.length);
  });
});
