import {
  EXCLUDE_REWARD_TRANSFERS,
  extractAccountPartyId,
  isUnfilteredExcludeRewards,
  withExcludedRewardTransfers
} from './unified-transaction-filters';

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
          _or: [
            { from: { id: { _eq: 'acc1' } } },
            { to: { id: { _eq: 'acc1' } } }
          ]
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
          _or: [
            { from: { id: { _eq: accountId } } },
            { to: { id: { _eq: accountId } } }
          ]
        })
      )
    ).toBe(accountId);
  });

  it('extracts id from bare from/to same-id OR', () => {
    expect(
      extractAccountPartyId({
        _or: [
          { from: { id: { _eq: accountId } } },
          { to: { id: { _eq: accountId } } }
        ]
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
          _or: [
            { from: { id: { _eq: accountId } } },
            { to: { id: { _eq: 'other' } } }
          ]
        })
      )
    ).toBeNull();
  });

  it('returns null when _or is missing or incomplete', () => {
    expect(
      extractAccountPartyId(
        withExcludedRewardTransfers({
          from: { id: { _eq: accountId } }
        })
      )
    ).toBeNull();
    expect(
      extractAccountPartyId(
        withExcludedRewardTransfers({
          _or: [{ from: { id: { _eq: accountId } } }]
        })
      )
    ).toBeNull();
  });
});
