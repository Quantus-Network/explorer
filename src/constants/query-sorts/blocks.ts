import type { SortDirection } from '@/types/query';

export interface BlockSorts {
  id?: SortDirection;
  hash?: SortDirection;
  height?: SortDirection;
  reward?: SortDirection;
  timestamp?: SortDirection;
  extrinsics_aggregate?: {
    count?: SortDirection;
  };
}

export const BLOCK_SORTS_LITERALS = [
  'id:desc',
  'hash:desc',
  'height:desc',
  'reward:desc',
  'timestamp:desc',
  'extrinsicsCount:desc',
  'id:asc',
  'hash:asc',
  'height:asc',
  'reward:asc',
  'timestamp:asc',
  'extrinsicsCount:asc'
];

export const transformBlockOrderBy = (
  orderBy: string
): BlockSorts | undefined => {
  const [key, order] = orderBy.split(':');
  if (!key || !order) return undefined;

  if (key === 'extrinsicsCount') {
    return {
      extrinsics_aggregate: {
        count: order as SortDirection
      }
    };
  }

  return {
    [key]: order
  } as BlockSorts;
};
