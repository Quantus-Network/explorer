import type { SortDirection } from '@/types/query';

export interface MultisigDepositsClaimedSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  total_returned?: SortDirection;
  proposals_removed?: SortDirection;
  block_height?: SortDirection;
}

export const MULTISIG_DEPOSITS_CLAIMED_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'total_returned:desc',
  'proposals_removed:desc',
  'block_height:desc',
  'id:asc',
  'timestamp:asc',
  'total_returned:asc',
  'proposals_removed:asc',
  'block_height:asc'
];
