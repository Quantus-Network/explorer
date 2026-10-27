import type { SortDirection } from '@/types/query';

export interface MinerRewardSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  reward?: SortDirection;
  miner_id?: SortDirection;
  block?: {
    hash?: SortDirection;
    height?: SortDirection;
  };
}

export const MINER_REWARD_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'block_height:desc',
  'block_hash:desc',
  'reward:desc',
  'miner_id:desc',
  'id:asc',
  'timestamp:asc',
  'block_height:asc',
  'block_hash:asc',
  'reward:asc',
  'miner_id:asc'
];

/**
 * `block_height` and `block_hash` are table column ids. miner_reward_order_by
 * has no such fields; height and hash sort through the block relationship.
 */
export const transformMinerRewardOrderBy = (
  orderBy: string
): MinerRewardSorts | undefined => {
  const [key, order] = orderBy.split(':');
  if (!key || !order) return undefined;

  const direction = order as SortDirection;

  if (key === 'block_height') {
    return { block: { height: direction } };
  }

  if (key === 'block_hash') {
    return { block: { hash: direction } };
  }

  return {
    [key]: direction
  } as MinerRewardSorts;
};
