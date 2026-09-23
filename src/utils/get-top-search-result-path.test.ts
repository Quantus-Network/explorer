import type { SearchAllResponse } from '@/schemas/searchs';

import {
  getTopSearchResultPath,
  topSearchResultPathOnEnter
} from './get-top-search-result-path';

const block = { height: 10, hash: '0xblock' };

const emptyResult = (): SearchAllResponse => ({
  transactions: [],
  accounts: [],
  blocks: [],
  highSecuritySets: [],
  errorEvents: []
});

const immediateTx = {
  id: 'tx-1',
  type: 'IMMEDIATE' as const,
  hash: '0xabc',
  detail_id: 'detail-1',
  block
};

describe('getTopSearchResultPath', () => {
  it('returns undefined when there is no result', () => {
    expect(getTopSearchResultPath(undefined)).toBeUndefined();
    expect(getTopSearchResultPath(emptyResult())).toBeUndefined();
  });

  it('picks the first transaction before later sections', () => {
    const result = emptyResult();
    result.transactions = [immediateTx];
    result.accounts = [{ id: 'acc-1' }];

    expect(getTopSearchResultPath(result)).toBe('/transactions/0xabc');
  });

  it('falls through empty sections in preview order', () => {
    const accountsOnly = emptyResult();
    accountsOnly.accounts = [{ id: 'acc-1' }];
    expect(getTopSearchResultPath(accountsOnly)).toBe('/accounts/acc-1');

    const blocksOnly = emptyResult();
    blocksOnly.blocks = [{ height: 42 }];
    expect(getTopSearchResultPath(blocksOnly)).toBe('/blocks/42');

    const highSecurityOnly = emptyResult();
    highSecurityOnly.highSecuritySets = [
      { extrinsic: { id: 'hs-1' } }
    ] as SearchAllResponse['highSecuritySets'];
    expect(getTopSearchResultPath(highSecurityOnly)).toBe(
      '/high-security-sets/hs-1'
    );

    const errorsOnly = emptyResult();
    errorsOnly.errorEvents = [
      { extrinsic: { id: 'err-1' } }
    ] as SearchAllResponse['errorEvents'];
    expect(getTopSearchResultPath(errorsOnly)).toBe('/errors/err-1');
  });

  it('uses the transaction detail route for non-immediate types', () => {
    const result = emptyResult();
    result.transactions = [
      {
        ...immediateTx,
        type: 'SCHEDULED_REVERSIBLE',
        hash: null,
        detail_id: 'sched-1'
      }
    ];

    expect(getTopSearchResultPath(result)).toBe(
      '/transactions/scheduled-reversible/sched-1'
    );
  });
});

describe('topSearchResultPathOnEnter', () => {
  const ready = {
    key: 'Enter',
    isComposing: false,
    targetIsKeywordInput: true,
    isResultVisible: true,
    isLoading: false,
    hasError: false,
    inputValue: 'acc-1',
    resultKeyword: 'acc-1',
    result: {
      ...emptyResult(),
      accounts: [{ id: 'acc-1' }]
    }
  };

  it('returns the top result path when results are shown', () => {
    expect(topSearchResultPathOnEnter(ready)).toBe('/accounts/acc-1');
  });

  it('ignores Enter when results are hidden, loading, failed, or empty', () => {
    expect(
      topSearchResultPathOnEnter({ ...ready, isResultVisible: false })
    ).toBeUndefined();
    expect(
      topSearchResultPathOnEnter({ ...ready, isLoading: true })
    ).toBeUndefined();
    expect(
      topSearchResultPathOnEnter({ ...ready, hasError: true })
    ).toBeUndefined();
    expect(
      topSearchResultPathOnEnter({ ...ready, result: emptyResult() })
    ).toBeUndefined();
    expect(
      topSearchResultPathOnEnter({ ...ready, result: undefined })
    ).toBeUndefined();
  });

  it('ignores Enter when the field no longer matches the shown query', () => {
    expect(
      topSearchResultPathOnEnter({ ...ready, inputValue: 'acc-1x' })
    ).toBeUndefined();
  });

  it('ignores keys other than Enter, IME composition, and non-search targets', () => {
    expect(
      topSearchResultPathOnEnter({ ...ready, key: 'Escape' })
    ).toBeUndefined();
    expect(
      topSearchResultPathOnEnter({ ...ready, isComposing: true })
    ).toBeUndefined();
    expect(
      topSearchResultPathOnEnter({ ...ready, targetIsKeywordInput: false })
    ).toBeUndefined();
  });

  it('treats surrounding whitespace as the same query', () => {
    expect(
      topSearchResultPathOnEnter({ ...ready, inputValue: '  acc-1  ' })
    ).toBe('/accounts/acc-1');
  });
});
