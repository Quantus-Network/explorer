import type { SortDirection } from '@/types/query';

export interface MultisigSignerApprovedSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  approvals_count?: SortDirection;
  block_height?: SortDirection;
}

export const MULTISIG_SIGNER_APPROVED_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'approvals_count:desc',
  'block_height:desc',
  'id:asc',
  'timestamp:asc',
  'approvals_count:asc',
  'block_height:asc'
];
