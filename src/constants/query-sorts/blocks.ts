import type { SortDirection } from '@/types/query';

export interface BlockSorts {
  id?: SortDirection;
  hash?: SortDirection;
  height?: SortDirection;
  reward?: SortDirection;
  timestamp?: SortDirection;
}

export const BLOCK_SORTS_LITERALS = [
  'id:desc',
  'hash:desc',
  'height:desc',
  'reward:desc',
  'timestamp:desc',
  'id:asc',
  'hash:asc',
  'height:asc',
  'reward:asc',
  'timestamp:asc'
];
