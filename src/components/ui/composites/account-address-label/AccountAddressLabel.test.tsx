import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';

import {
  ACCOUNT_TYPE_LABELS,
  ACCOUNT_TYPES,
  type AccountType
} from '@/constants/account-types';
import type { AccountAddressClassification } from '@/utils/classify-account-address';

import { AccountAddressLabel, AccountTags } from './AccountAddressLabel';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  Element: dom.window.Element,
  Node: dom.window.Node,
  navigator: dom.window.navigator,
  IS_REACT_ACT_ENVIRONMENT: true
});

const transparent: AccountAddressClassification = {
  isHighSecurity: false,
  isGuardian: false,
  isMultisig: false,
  isDepositOnly: false,
  hasMinedBlocks: false
};

const ACCOUNTS: Record<AccountType, AccountAddressClassification> = {
  transparent,
  potential_encrypted: { ...transparent, isDepositOnly: true },
  encrypted: { ...transparent, isDepositOnly: true, hasMinedBlocks: true },
  high_security: { ...transparent, isHighSecurity: true },
  guardian: { ...transparent, isGuardian: true },
  multisig: { ...transparent, isMultisig: true }
};

describe('AccountAddressLabel', () => {
  it('uses the agreed display names in filter order', () => {
    expect(ACCOUNT_TYPES.map((type) => ACCOUNT_TYPE_LABELS[type])).toEqual([
      'Transparent',
      'Potentially Encrypted',
      'Encrypted',
      'Advanced',
      'Guardian',
      'Multisig'
    ]);
  });

  it.each(ACCOUNT_TYPES)(
    'shows a %s account under its filter option label',
    (type) => {
      const { container } = render(<AccountAddressLabel {...ACCOUNTS[type]} />);

      expect(container.textContent).toBe(ACCOUNT_TYPE_LABELS[type]);
    }
  );

  it('shows one value for an account with every flag', () => {
    const { container } = render(
      <AccountAddressLabel
        {...transparent}
        isMultisig
        isHighSecurity
        isGuardian
      />
    );

    expect(container.textContent).toBe('Multisig');
    expect(container.children).toHaveLength(1);
  });
});

describe('AccountTags', () => {
  it('lists every tag', () => {
    const { container } = render(<AccountTags tags={['First', 'Second']} />);

    expect(container.textContent).toBe('First, Second');
  });

  it('renders no text without tags', () => {
    const { container } = render(<AccountTags tags={[]} />);

    expect(container.textContent).toBe('');
  });
});
