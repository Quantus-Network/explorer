import type { SortDirection } from '@/types/query';

export interface TransactionSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  fee?: SortDirection;
  extrinsic_id?: SortDirection;
  block_height?: SortDirection;
  amount?: SortDirection;
  from_id?: SortDirection;
  to_id?: SortDirection;
}

export const TRANSACTION_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'fee:desc',
  'extrinsic_id:desc',
  'block_height:desc',
  'amount:desc',
  'from_id:desc',
  'to_id:desc',
  'id:asc',
  'timestamp:asc',
  'fee:asc',
  'extrinsic_id:asc',
  'block_height:asc',
  'amount:asc',
  'from_id:asc',
  'to_id:asc'
];
