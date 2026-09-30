import { classifyAccountAddress } from './classify-account-address';

const standard = {
  isHighSecurity: false,
  isGuardian: false,
  isMultisig: false
};

describe('classifyAccountAddress', () => {
  it('classifies a standard deposit-only account as a potential encrypted address', () => {
    expect(classifyAccountAddress({ ...standard, isDepositOnly: true })).toBe(
      'Potential Encrypted Address'
    );
  });

  it('classifies a standard account that is not deposit-only as a transparent address', () => {
    expect(classifyAccountAddress({ ...standard, isDepositOnly: false })).toBe(
      'Transparent Address'
    );
  });

  it('classifies a missing account row as a transparent address', () => {
    expect(classifyAccountAddress({ ...standard, isDepositOnly: null })).toBe(
      'Transparent Address'
    );
  });

  it.each([
    { isHighSecurity: true, isGuardian: false, isMultisig: false },
    { isHighSecurity: false, isGuardian: true, isMultisig: false },
    { isHighSecurity: false, isGuardian: false, isMultisig: true }
  ])(
    'classifies a flagged account as a transparent address even when it is deposit-only',
    (flags) => {
      expect(classifyAccountAddress({ ...flags, isDepositOnly: true })).toBe(
        'Transparent Address'
      );
    }
  );
});
