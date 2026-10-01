import { classifyAccountAddress } from './classify-account-address';

const standard = {
  isHighSecurity: false,
  isGuardian: false,
  isMultisig: false
};

describe('classifyAccountAddress', () => {
  it('classifies a standard deposit-only account that has mined as an encrypted address', () => {
    expect(
      classifyAccountAddress({
        ...standard,
        isDepositOnly: true,
        hasMinedBlocks: true
      })
    ).toBe('Encrypted Address');
  });

  it('classifies a standard deposit-only account that never mined as a potential encrypted address', () => {
    expect(
      classifyAccountAddress({
        ...standard,
        isDepositOnly: true,
        hasMinedBlocks: false
      })
    ).toBe('Potential Encrypted Address');
  });

  it.each([true, false])(
    'classifies a standard account that is not deposit-only as a transparent address (hasMinedBlocks: %p)',
    (hasMinedBlocks) => {
      expect(
        classifyAccountAddress({
          ...standard,
          isDepositOnly: false,
          hasMinedBlocks
        })
      ).toBe('Transparent Address');
    }
  );

  it('classifies a missing account row as a transparent address', () => {
    expect(
      classifyAccountAddress({
        ...standard,
        isDepositOnly: null,
        hasMinedBlocks: false
      })
    ).toBe('Transparent Address');
  });

  it.each([
    { isHighSecurity: true, isGuardian: false, isMultisig: false },
    { isHighSecurity: false, isGuardian: true, isMultisig: false },
    { isHighSecurity: false, isGuardian: false, isMultisig: true }
  ])(
    'classifies a flagged account as a transparent address even when it is deposit-only and has mined',
    (flags) => {
      expect(
        classifyAccountAddress({
          ...flags,
          isDepositOnly: true,
          hasMinedBlocks: true
        })
      ).toBe('Transparent Address');
    }
  );
});
