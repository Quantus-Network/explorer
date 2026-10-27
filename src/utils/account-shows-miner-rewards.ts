/** True when the account page should offer a Miner Rewards tab. */
export function accountShowsMinerRewards(input: {
  hasMinedBlocks: boolean;
  totalMinedBlocks: number;
}): boolean {
  return input.hasMinedBlocks || input.totalMinedBlocks > 0;
}
