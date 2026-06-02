import type { SortDirection } from '@/types/query';

export interface MultisigProposalSorts {
  id?: SortDirection;
  status?: SortDirection;
  deposit?: SortDirection;
  created_at?: SortDirection;
  expiry_block?: SortDirection;
}

export const MULTISIG_PROPOSAL_SORTS_LITERALS = [
  'id:desc',
  'created_at:desc',
  'status:desc',
  'expiry_block:desc',
  'id:asc',
  'created_at:asc',
  'status:asc',
  'expiry_block:asc'
];
