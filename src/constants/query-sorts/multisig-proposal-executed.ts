import type { SortDirection } from '@/types/query';

export interface MultisigProposalExecutedSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  result?: SortDirection;
  block_height?: SortDirection;
}

export const MULTISIG_PROPOSAL_EXECUTED_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'result:desc',
  'block_height:desc',
  'id:asc',
  'timestamp:asc',
  'result:asc',
  'block_height:asc'
];
