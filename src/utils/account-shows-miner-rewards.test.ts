import { accountShowsMinerRewards } from './account-shows-miner-rewards';

describe('accountShowsMinerRewards', () => {
  it('hides the tab when the account has neither mined nor any miner rewards', () => {
    expect(
      accountShowsMinerRewards({
        hasMinedBlocks: false,
        totalMinedBlocks: 0
      })
    ).toBe(false);
  });

  it('shows the tab when the account has mined even if the reward count is zero', () => {
    expect(
      accountShowsMinerRewards({
        hasMinedBlocks: true,
        totalMinedBlocks: 0
      })
    ).toBe(true);
  });

  it('shows the tab when the reward count is positive even if the mined flag is false', () => {
    expect(
      accountShowsMinerRewards({
        hasMinedBlocks: false,
        totalMinedBlocks: 3
      })
    ).toBe(true);
  });

  it('shows the tab when the account has both mined and a positive reward count', () => {
    expect(
      accountShowsMinerRewards({
        hasMinedBlocks: true,
        totalMinedBlocks: 12
      })
    ).toBe(true);
  });
});
