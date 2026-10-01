import {
  accountPartyWhere,
  EXCLUDE_REWARD_TRANSFERS,
  extractAccountPartyId,
  isUnfilteredExcludeRewards,
  last24HourTransferredWhere,
  withExcludedRewardTransfers
} from './unified-transaction-filters';

describe('accountPartyWhere', () => {
  it('matches rows where the account is sender or receiver', () => {
    expect(accountPartyWhere('qz1')).toEqual({
      _or: [{ from_id: { _eq: 'qz1' } }, { to_id: { _eq: 'qz1' } }]
    });
  });

  it('is recognised as an account party list for the precomputed total', () => {
    expect(
      extractAccountPartyId(
        withExcludedRewardTransfers(accountPartyWhere('qz1'))
      )
    ).toBe('qz1');
  });
});

describe('last24HourTransferredWhere', () => {
  it('includes signed immediate, wormhole, and executed reversible amounts only', () => {
    const where = last24HourTransferredWhere(
      '2026-09-27T15:30:00.000Z',
      '2026-09-28T15:30:00.000Z'
    );

    expect(where).toEqual({
      timestamp: {
        _gte: '2026-09-27T15:30:00.000Z',
        _lte: '2026-09-28T15:30:00.000Z'
      },
      _or: [
        {
          _and: [{ type: { _eq: 'IMMEDIATE' } }, { hash: { _is_null: false } }]
        },
        { type: { _eq: 'WORMHOLE' } },
        { type: { _eq: 'EXECUTED_REVERSIBLE' } }
      ]
    });
    expect(JSON.stringify(where)).not.toContain('SCHEDULED_REVERSIBLE');
    expect(JSON.stringify(where)).not.toContain('CANCELLED_REVERSIBLE');
  });
});

describe('isUnfilteredExcludeRewards', () => {
  it('treats undefined as unfiltered', () => {
    expect(isUnfilteredExcludeRewards(undefined)).toBe(true);
  });

  it('matches the shared EXCLUDE_REWARD_TRANSFERS reference', () => {
    expect(isUnfilteredExcludeRewards(EXCLUDE_REWARD_TRANSFERS)).toBe(true);
    expect(isUnfilteredExcludeRewards(withExcludedRewardTransfers())).toBe(
      true
    );
  });

  it('rejects wrapped account filters', () => {
    expect(
      isUnfilteredExcludeRewards(
        withExcludedRewardTransfers({
          _or: [{ from_id: { _eq: 'acc1' } }, { to_id: { _eq: 'acc1' } }]
        })
      )
    ).toBe(false);
  });
});

describe('extractAccountPartyId', () => {
  const accountId = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

  it('returns null for undefined / unfiltered exclude-rewards', () => {
    expect(extractAccountPartyId(undefined)).toBeNull();
    expect(extractAccountPartyId(EXCLUDE_REWARD_TRANSFERS)).toBeNull();
    expect(extractAccountPartyId(withExcludedRewardTransfers())).toBeNull();
  });

  it('extracts id from exclude-rewards + from/to same-id OR', () => {
    expect(
      extractAccountPartyId(
        withExcludedRewardTransfers({
          _or: [{ from_id: { _eq: accountId } }, { to_id: { _eq: accountId } }]
        })
      )
    ).toBe(accountId);
  });

  it('extracts id from bare from/to same-id OR', () => {
    expect(
      extractAccountPartyId({
        _or: [{ from_id: { _eq: accountId } }, { to_id: { _eq: accountId } }]
      })
    ).toBe(accountId);
  });

  it('returns null for block height filter', () => {
    expect(
      extractAccountPartyId(
        withExcludedRewardTransfers({
          block_height: { _eq: 42 }
        })
      )
    ).toBeNull();
  });

  it('returns null when from/to ids differ', () => {
    expect(
      extractAccountPartyId(
        withExcludedRewardTransfers({
          _or: [{ from_id: { _eq: accountId } }, { to_id: { _eq: 'other' } }]
        })
      )
    ).toBeNull();
  });

  it('returns null when _or is missing or incomplete', () => {
    expect(
      extractAccountPartyId(
        withExcludedRewardTransfers({
          from_id: { _eq: accountId }
        })
      )
    ).toBeNull();
    expect(
      extractAccountPartyId(
        withExcludedRewardTransfers({
          _or: [{ from_id: { _eq: accountId } }]
        })
      )
    ).toBeNull();
  });
});
