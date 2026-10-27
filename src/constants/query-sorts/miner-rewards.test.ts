import { transformMinerRewardOrderBy } from './miner-rewards';

describe('miner reward orderBy variables', () => {
  it.each([
    ['block_height:asc', { block: { height: 'asc' } }],
    ['block_height:desc', { block: { height: 'desc' } }],
    ['block_hash:asc', { block: { hash: 'asc' } }],
    ['block_hash:desc', { block: { hash: 'desc' } }]
  ] as const)(
    'maps the %s header sort onto the block relationship',
    (literal, expected) => {
      expect(transformMinerRewardOrderBy(literal)).toEqual(expected);
    }
  );

  it.each([
    ['reward:desc', { reward: 'desc' }],
    ['timestamp:asc', { timestamp: 'asc' }],
    ['miner_id:desc', { miner_id: 'desc' }],
    ['id:asc', { id: 'asc' }]
  ] as const)(
    'keeps the direct %s sort on miner_reward',
    (literal, expected) => {
      expect(transformMinerRewardOrderBy(literal)).toEqual(expected);
    }
  );

  it('omits orderBy when no header sort is selected', () => {
    expect(transformMinerRewardOrderBy('')).toBeUndefined();
    expect(transformMinerRewardOrderBy('block_height')).toBeUndefined();
  });
});
