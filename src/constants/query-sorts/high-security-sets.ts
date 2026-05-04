import type { SortDirection } from '@/types/query';

export interface HighSecuritySetSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  delay?: SortDirection;
  extrinsic_id?: SortDirection;
  block_height?: SortDirection;
  who_id?: SortDirection;
  interceptor_id?: SortDirection;
}

export const HIGH_SECURITY_SET_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'delay:desc',
  'extrinsic_id:desc',
  'block_height:desc',
  'who_id:desc',
  'interceptor_id:desc',
  'id:asc',
  'timestamp:asc',
  'delay:asc',
  'extrinsic_id:asc',
  'block_height:asc',
  'who_id:asc',
  'interceptor_id:asc'
];
