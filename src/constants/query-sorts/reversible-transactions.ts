import type { SortDirection } from '@/types/query';

export interface ReversibleTransactionSorts {
  id?: SortDirection;
  timestamp?: SortDirection;
  scheduled_at?: SortDirection;
  status?: SortDirection;
  extrinsic_id?: SortDirection;
  tx_id?: SortDirection;
  block_height?: SortDirection;
  who_id?: SortDirection;
}

export const REVERSIBLE_TRANSACTION_SORTS_LITERALS = [
  'id:desc',
  'timestamp:desc',
  'scheduled_at:desc',
  'status:desc',
  'extrinsic_id:desc',
  'tx_id:desc',
  'block_height:desc',
  'who_id:desc',
  'id:asc',
  'timestamp:asc',
  'scheduled_at:asc',
  'status:asc',
  'extrinsic_id:asc',
  'tx_id:asc',
  'block_height:asc',
  'who_id:asc'
];

export interface ScheduledReversibleTransactionSorts {
  timestamp?: SortDirection;
  scheduled_at?: SortDirection;
  amount?: SortDirection;
}

export const SCHEDULED_REVERSIBLE_TRANSACTION_SORTS_LITERALS = [
  'timestamp:desc',
  'scheduled_at:desc',
  'amount:desc',
  'timestamp:asc',
  'scheduled_at:asc',
  'amount:asc'
];

export interface ExecutedReversibleTransactionSorts {
  timestamp?: SortDirection;
}

export const EXECUTED_REVERSIBLE_TRANSACTION_SORTS_LITERALS = [
  'timestamp:desc',
  'timestamp:asc'
];

export interface CancelledReversibleTransactionSorts {
  timestamp?: SortDirection;
}

export const CANCELLED_REVERSIBLE_TRANSACTION_SORTS_LITERALS = [
  'timestamp:desc',
  'timestamp:asc'
];
