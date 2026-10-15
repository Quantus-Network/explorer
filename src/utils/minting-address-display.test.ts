import {
  MINTING_ADDRESS,
  MINTING_ADDRESS_FROM_LABEL,
  MINTING_ADDRESS_TYPE_LABEL
} from '@/constants/minting-address';
import {
  VESTING_CONTRACT_ADDRESS,
  VESTING_CONTRACT_TYPE_LABEL
} from '@/constants/vesting-contract-address';
import { TRANSPARENT_ADDRESS_LABEL } from '@/utils/classify-account-address';

import {
  accountAddressTypeLabel,
  fromAddressPlainLabel
} from './minting-address-display';

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

  it('keeps Transparent Address for any other standard account', () => {
    expect(accountAddressTypeLabel(`${MINTING_ADDRESS}x`, transparent)).toBe(
      TRANSPARENT_ADDRESS_LABEL
    );
  });
});
