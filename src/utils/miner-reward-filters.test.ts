import {
  extractMinerId,
  isUnfilteredMinerRewards,
  minerRewardsOfMiner
} from './miner-reward-filters';

const minerId = 'qzjVsKygc34wWPcC5gaRArB5PZPV92h1BTzEaY8kQHuBs9Kjk';

describe('isUnfilteredMinerRewards', () => {
  it('treats undefined, null and {} as unfiltered', () => {
    expect(isUnfilteredMinerRewards(undefined)).toBe(true);
    expect(isUnfilteredMinerRewards(null)).toBe(true);
    expect(isUnfilteredMinerRewards({})).toBe(true);
  });

  it('treats keys explicitly set to undefined as absent', () => {
    expect(isUnfilteredMinerRewards({ miner_id: undefined })).toBe(true);
  });

  it('rejects any real predicate', () => {
    expect(isUnfilteredMinerRewards(minerRewardsOfMiner(minerId))).toBe(false);
    expect(isUnfilteredMinerRewards({ reward: { _gt: '0' } })).toBe(false);
  });
});

describe('extractMinerId', () => {
  it('returns null for unfiltered input', () => {
    expect(extractMinerId(undefined)).toBeNull();
    expect(extractMinerId({})).toBeNull();
  });

  it('extracts the id from the builder output', () => {
    expect(extractMinerId(minerRewardsOfMiner(minerId))).toBe(minerId);
  });

  it('extracts the id from a hand-written exact miner_id _eq filter', () => {
    expect(extractMinerId({ miner_id: { _eq: minerId } })).toBe(minerId);
  });

  it('returns null when other predicates are combined with the miner filter', () => {
    expect(
      extractMinerId({ miner_id: { _eq: minerId }, reward: { _gt: '0' } })
    ).toBeNull();
    expect(
      extractMinerId({ _and: [{ miner_id: { _eq: minerId } }] })
    ).toBeNull();
  });

  it('returns null for non-_eq or multi-operator miner_id comparisons', () => {
    expect(extractMinerId({ miner_id: { _in: [minerId] } })).toBeNull();
    expect(
      extractMinerId({ miner_id: { _eq: minerId, _neq: 'other' } })
    ).toBeNull();
  });

  it('returns null for the nested relationship form', () => {
    expect(extractMinerId({ miner: { id: { _eq: minerId } } })).toBeNull();
  });
});
