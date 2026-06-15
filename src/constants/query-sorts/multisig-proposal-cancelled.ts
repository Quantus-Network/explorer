import type { SortDirection } from '@/types/query';

export interface MultisigProposalCancelledSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  block_height?: SortDirection;
}

export const MULTISIG_PROPOSAL_CANCELLED_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'block_height:desc',
  'id:asc',
  'timestamp:asc',
  'block_height:asc'
];
