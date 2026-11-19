import {
  accountTypeLabel,
  classifyAccountAddress
} from './classify-account-address';

const standard = {
  isHighSecurity: false,
  isGuardian: false,
  isMultisig: false
};
const transparent = {
  ...standard,
  isDepositOnly: false,
  hasMinedBlocks: false
};

describe('classifyAccountAddress', () => {
  it('classifies a standard deposit-only account that has mined as encrypted', () => {
    expect(
      classifyAccountAddress({
        ...standard,
        isDepositOnly: true,
        hasMinedBlocks: true
      })
    ).toBe('encrypted');
  });

  it('classifies a standard deposit-only account that never mined as potentially encrypted', () => {
    expect(
      classifyAccountAddress({
        ...standard,
        isDepositOnly: true,
        hasMinedBlocks: false
      })
    ).toBe('potential_encrypted');
  });

  it.each([true, false])(
    'classifies a standard account that is not deposit-only as transparent (hasMinedBlocks: %p)',
    (hasMinedBlocks) => {
      expect(
        classifyAccountAddress({
          ...standard,
          isDepositOnly: false,
          hasMinedBlocks
        })
      ).toBe('transparent');
    }
  );

  it('classifies a missing account row as transparent', () => {
    expect(
      classifyAccountAddress({
        ...standard,
        isDepositOnly: null,
        hasMinedBlocks: false
      })
    ).toBe('transparent');
  });

  it.each([
    ['multisig', { isMultisig: true }],
    ['high_security', { isHighSecurity: true }],
    ['guardian', { isGuardian: true }]
  ] as const)('classifies a lone %s flag as that type', (type, flag) => {
    expect(classifyAccountAddress({ ...transparent, ...flag })).toBe(type);
  });

  it('puts multisig ahead of advanced', () => {
    expect(
      classifyAccountAddress({
        ...transparent,
        isMultisig: true,
        isHighSecurity: true
      })
    ).toBe('multisig');
  });

  it('puts advanced ahead of guardian', () => {
    expect(
      classifyAccountAddress({
        ...transparent,
        isHighSecurity: true,
        isGuardian: true
      })
    ).toBe('high_security');
  });

  it('puts multisig ahead of every other flag', () => {
    expect(
      classifyAccountAddress({
        ...transparent,
        isMultisig: true,
        isHighSecurity: true,
        isGuardian: true
      })
    ).toBe('multisig');
  });

  it.each([
    ['multisig', { isMultisig: true }],
    ['high_security', { isHighSecurity: true }],
    ['guardian', { isGuardian: true }]
  ] as const)('puts %s ahead of the encrypted types', (type, flag) => {
    expect(
      classifyAccountAddress({
        ...standard,
        ...flag,
        isDepositOnly: true,
        hasMinedBlocks: true
      })
    ).toBe(type);
  });
});

describe('accountTypeLabel', () => {
  it.each([
    [{ isDepositOnly: false, hasMinedBlocks: false }, 'Guardian (Transparent)'],
    [
      { isDepositOnly: true, hasMinedBlocks: false },
      'Guardian (Potentially Encrypted)'
    ],
    [{ isDepositOnly: true, hasMinedBlocks: true }, 'Guardian (Encrypted)'],
    [{ isDepositOnly: null, hasMinedBlocks: false }, 'Guardian (Transparent)']
  ])('names the address type of a guardian %o', (addressType, expected) => {
    expect(
      accountTypeLabel({ ...standard, ...addressType, isGuardian: true })
    ).toBe(expected);
  });

  it('names no address type for an advanced account that is also a guardian', () => {
    expect(
      accountTypeLabel({
        ...transparent,
        isHighSecurity: true,
        isGuardian: true
      })
    ).toBe('Advanced');
  });

  it.each([
    ['Multisig', { isMultisig: true }],
    ['Advanced', { isHighSecurity: true }],
    ['Transparent', {}],
    ['Potentially Encrypted', { isDepositOnly: true }],
    ['Encrypted', { isDepositOnly: true, hasMinedBlocks: true }]
  ])('labels a non-guardian account %s', (expected, flags) => {
    expect(accountTypeLabel({ ...transparent, ...flags })).toBe(expected);
  });
});
