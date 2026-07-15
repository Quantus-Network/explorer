import type { SortDirection } from '@/types/query';

export interface UnifiedListTransactionSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  fee?: SortDirection;
  hash?: SortDirection;
  block_height?: SortDirection;
  amount?: SortDirection;
  from_id?: SortDirection;
  to_id?: SortDirection;
  status?: SortDirection;
  type?: SortDirection;
}

export const UNIFIED_LIST_TRANSACTION_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'fee:desc',
  'hash:desc',
  'block_height:desc',
  'amount:desc',
  'from_id:desc',
  'to_id:desc',
  'status:desc',
  'type:desc',
  'id:asc',
  'timestamp:asc',
  'fee:asc',
  'hash:asc',
  'block_height:asc',
  'amount:asc',
  'from_id:asc',
  'to_id:asc',
  'status:asc',
  'type:asc'
];
