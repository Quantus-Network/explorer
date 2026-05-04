import type { SortDirection } from '@/types/query';

export interface MinerRewardSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  block_height?: SortDirection;
  reward?: SortDirection;
  miner_id?: SortDirection;
}

export const MINER_REWARD_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'block_height:desc',
  'reward:desc',
  'miner_id:desc',
  'id:asc',
  'timestamp:asc',
  'block_height:asc',
  'reward:asc',
  'miner_id:asc'
];
