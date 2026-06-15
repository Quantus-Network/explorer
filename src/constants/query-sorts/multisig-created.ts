import type { SortDirection } from '@/types/query';

export interface MultisigCreatedSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  threshold?: SortDirection;
  block_height?: SortDirection;
}

export const MULTISIG_CREATED_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'threshold:desc',
  'block_height:desc',
  'id:asc',
  'timestamp:asc',
  'threshold:asc',
  'block_height:asc'
];
