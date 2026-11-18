import {
  KNOWN_ADDRESSES,
  MINTING_ADDRESS_FROM_LABEL
} from '@/constants/known-addresses';

import {
  fromAddressPlainLabel,
  knownAddressTags
} from './known-address-display';

const MINTING_ADDRESS = KNOWN_ADDRESSES.minting.address;
const VESTING_CONTRACT_ADDRESS = KNOWN_ADDRESSES.vestingContract.address;
const NEAR_INTENTS_BRIDGE_ADDRESS =
  'qzmzw3Bf2sPHaqSZJnUmNJAYiD5DZosZ4xw1kZduqGGKePTDk';

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

describe('knownAddressTags', () => {
  it('tags the minting address', () => {
    expect(knownAddressTags(MINTING_ADDRESS)).toEqual(['Minting Address']);
  });

  it('tags the vesting contract address', () => {
    expect(knownAddressTags(VESTING_CONTRACT_ADDRESS)).toEqual([
      'Vesting Contract'
    ]);
  });

  it('tags the NEAR Intents bridge address', () => {
    expect(knownAddressTags(NEAR_INTENTS_BRIDGE_ADDRESS)).toEqual([
      'NEAR Intents Bridge'
    ]);
  });

  it('gives an unknown address no tags', () => {
    expect(knownAddressTags(`${MINTING_ADDRESS}x`)).toEqual([]);
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
