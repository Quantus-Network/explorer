import {
  accountTypeFilteredTransactionsWhere,
  accountTypeRuleWhere,
  accountTypeWhere,
  parseAccountTypeFilterRule,
  partyAccountTypeRulesWhere,
  serializeAccountTypeFilterRule,
  toggleRuleType
} from './account-type-filter';
import { EXCLUDE_REWARD_TRANSFERS } from './unified-transaction-filters';

const STANDARD = {
  is_high_security: { _eq: false },
  is_guardian: { _eq: false },
  is_multisig: { _eq: false }
};

describe('accountTypeWhere', () => {
  it('matches only unflagged non-deposit-only accounts as transparent', () => {
    expect(accountTypeWhere('transparent')).toEqual({
      ...STANDARD,
      is_deposit_only: { _eq: false }
    });
  });

  it('matches unflagged deposit-only accounts without mined blocks as potential encrypted', () => {
    expect(accountTypeWhere('potential_encrypted')).toEqual({
      ...STANDARD,
      is_deposit_only: { _eq: true },
      has_mined_blocks: { _eq: false }
    });
  });

  it('matches unflagged deposit-only accounts with mined blocks as encrypted', () => {
    expect(accountTypeWhere('encrypted')).toEqual({
      ...STANDARD,
      is_deposit_only: { _eq: true },
      has_mined_blocks: { _eq: true }
    });
  });

  it.each([
    ['high_security', { is_high_security: { _eq: true } }],
    ['guardian', { is_guardian: { _eq: true } }],
    ['multisig', { is_multisig: { _eq: true } }]
  ] as const)('matches %s by its flag alone', (type, expected) => {
    expect(accountTypeWhere(type)).toEqual(expected);
  });
});

describe('accountTypeRuleWhere', () => {
  it('returns null when the rule has no types selected', () => {
    expect(accountTypeRuleWhere({ operator: 'is', types: [] })).toBeNull();
    expect(accountTypeRuleWhere({ operator: 'is_not', types: [] })).toBeNull();
  });

  it('keeps only accounts matching any selected type for "is"', () => {
    expect(
      accountTypeRuleWhere({ operator: 'is', types: ['guardian', 'multisig'] })
    ).toEqual({
      _or: [accountTypeWhere('guardian'), accountTypeWhere('multisig')]
    });
  });

  it('drops accounts matching any selected type for "is not"', () => {
    expect(
      accountTypeRuleWhere({ operator: 'is_not', types: ['transparent'] })
    ).toEqual({ _not: { _or: [accountTypeWhere('transparent')] } });
  });
});

describe('partyAccountTypeRulesWhere', () => {
  it('returns null when there are no rules', () => {
    expect(partyAccountTypeRulesWhere({})).toBeNull();
  });

  it('returns null when every rule is empty', () => {
    expect(
      partyAccountTypeRulesWhere({
        from: { operator: 'is', types: [] },
        to: { operator: 'is_not', types: [] }
      })
    ).toBeNull();
  });

  it('keeps rows whose sender matches for a "from is" rule', () => {
    expect(
      partyAccountTypeRulesWhere({
        from: { operator: 'is', types: ['encrypted', 'guardian'] }
      })
    ).toEqual({
      from: {
        _or: [accountTypeWhere('encrypted'), accountTypeWhere('guardian')]
      }
    });
  });

  it('drops rows whose receiver matches for a "to is not" rule, keeping rows without a receiver', () => {
    expect(
      partyAccountTypeRulesWhere({
        to: { operator: 'is_not', types: ['multisig'] }
      })
    ).toEqual({ _not: { to: { _or: [accountTypeWhere('multisig')] } } });
  });

  it('requires both sides when sender and receiver rules are set', () => {
    expect(
      partyAccountTypeRulesWhere({
        from: { operator: 'is', types: ['transparent'] },
        to: { operator: 'is_not', types: ['guardian'] }
      })
    ).toEqual({
      _and: [
        { from: { _or: [accountTypeWhere('transparent')] } },
        { _not: { to: { _or: [accountTypeWhere('guardian')] } } }
      ]
    });
  });

  it('ignores an empty rule next to an active one', () => {
    expect(
      partyAccountTypeRulesWhere({
        from: { operator: 'is', types: [] },
        to: { operator: 'is', types: ['guardian'] }
      })
    ).toEqual({ to: { _or: [accountTypeWhere('guardian')] } });
  });
});

describe('accountTypeFilteredTransactionsWhere', () => {
  const fromGuardian = { operator: 'is', types: ['guardian'] } as const;
  const partyWhere = { from: { _or: [accountTypeWhere('guardian')] } };

  it('returns null when no rule narrows results', () => {
    expect(
      accountTypeFilteredTransactionsWhere(undefined, {
        from: { operator: 'is', types: [] }
      })
    ).toBeNull();
  });

  it('excludes reward transfers around the party rules', () => {
    expect(
      accountTypeFilteredTransactionsWhere(undefined, { from: fromGuardian })
    ).toEqual({ _and: [EXCLUDE_REWARD_TRANSFERS, partyWhere] });
  });

  it('requires the table filter and the party rules together', () => {
    const baseWhere = { block: { height: { _eq: 7 } } };

    expect(
      accountTypeFilteredTransactionsWhere(baseWhere, { from: fromGuardian })
    ).toEqual({
      _and: [EXCLUDE_REWARD_TRANSFERS, { _and: [baseWhere, partyWhere] }]
    });
  });
});

describe('parseAccountTypeFilterRule', () => {
  it('parses an operator with its selected types', () => {
    expect(parseAccountTypeFilterRule('is:guardian,multisig')).toEqual({
      operator: 'is',
      types: ['guardian', 'multisig']
    });
  });

  it('parses a rule with no types selected yet', () => {
    expect(parseAccountTypeFilterRule('is_not:')).toEqual({
      operator: 'is_not',
      types: []
    });
  });

  it('returns types in canonical order without duplicates', () => {
    expect(
      parseAccountTypeFilterRule('is:multisig,transparent,multisig')
    ).toEqual({ operator: 'is', types: ['transparent', 'multisig'] });
  });

  it.each(['', 'is', 'contains:guardian', 'is:guardian,unknown', 'is:,'])(
    'rejects malformed value %j',
    (value) => {
      expect(parseAccountTypeFilterRule(value)).toBeNull();
    }
  );
});

describe('serializeAccountTypeFilterRule', () => {
  it('round-trips through the parser', () => {
    const rule = {
      operator: 'is_not',
      types: ['potential_encrypted', 'high_security']
    } as const;

    expect(
      parseAccountTypeFilterRule(serializeAccountTypeFilterRule(rule))
    ).toEqual(rule);
  });

  it('keeps a rule with no types selected', () => {
    expect(serializeAccountTypeFilterRule({ operator: 'is', types: [] })).toBe(
      'is:'
    );
  });
});

describe('toggleRuleType', () => {
  it('adds an unselected type in canonical order', () => {
    expect(
      toggleRuleType({ operator: 'is', types: ['multisig'] }, 'transparent')
    ).toEqual({ operator: 'is', types: ['transparent', 'multisig'] });
  });

  it('removes a selected type', () => {
    expect(
      toggleRuleType(
        { operator: 'is_not', types: ['guardian', 'multisig'] },
        'guardian'
      )
    ).toEqual({ operator: 'is_not', types: ['multisig'] });
  });
});
