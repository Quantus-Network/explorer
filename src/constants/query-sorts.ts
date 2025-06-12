export const ACCOUNT_SORTS = {
  id: {
    ASC: 'id_ASC',
    DESC: 'id_DESC'
  }
} as const;

export type AccountSorts =
  | typeof ACCOUNT_SORTS.id.ASC
  | typeof ACCOUNT_SORTS.id.DESC;

export const TRANSACTION_SORTS = {
  id: {
    ASC: 'id_ASC',
    DESC: 'id_DESC'
  },
  timestamp: {
    ASC: 'timestamp_ASC',
    DESC: 'timestamp_DESC'
  },
  fee: {
    ASC: 'fee_ASC',
    DESC: 'fee_DESC'
  },
  extrinsicHash: {
    ASC: 'extrinsicHash_ASC',
    DESC: 'extrinsicHash_DESC'
  },
  blockNumber: {
    ASC: 'blockNumber_ASC',
    DESC: 'blockNumber_DESC'
  },
  amount: {
    ASC: 'amount_ASC',
    DESC: 'amount_DESC'
  },
  from: {
    id_ASC: 'from_id_ASC',
    id_DESC: 'from_id_DESC'
  },
  to: {
    id_ASC: 'to_id_ASC',
    id_DESC: 'to_id_DESC'
  }
} as const;

export const TRANSACTION_SORTS_LITERALS = [
  'id_ASC',
  'id_DESC',
  'timestamp_ASC',
  'timestamp_DESC',
  'fee_ASC',
  'fee_DESC',
  'extrinsicHash_ASC',
  'extrinsicHash_DESC',
  'blockNumber_ASC',
  'blockNumber_DESC',
  'amount_ASC',
  'amount_DESC',
  'from_id_ASC',
  'from_id_DESC',
  'to_id_ASC',
  'to_id_DESC'
] as const;

export const TRANSACTION_SORTS_KEY = [
  'id',
  'timestamp',
  'fee',
  'extrinsicHash',
  'blockNumber',
  'amount',
  'from',
  'to'
] as const;

export type TransactionSorts =
  | typeof TRANSACTION_SORTS.id.ASC
  | typeof TRANSACTION_SORTS.id.DESC
  | typeof TRANSACTION_SORTS.timestamp.ASC
  | typeof TRANSACTION_SORTS.timestamp.DESC
  | typeof TRANSACTION_SORTS.fee.ASC
  | typeof TRANSACTION_SORTS.fee.DESC
  | typeof TRANSACTION_SORTS.extrinsicHash.ASC
  | typeof TRANSACTION_SORTS.extrinsicHash.DESC
  | typeof TRANSACTION_SORTS.blockNumber.ASC
  | typeof TRANSACTION_SORTS.blockNumber.DESC
  | typeof TRANSACTION_SORTS.amount.ASC
  | typeof TRANSACTION_SORTS.amount.DESC
  | typeof TRANSACTION_SORTS.from.id_ASC
  | typeof TRANSACTION_SORTS.from.id_DESC
  | typeof TRANSACTION_SORTS.to.id_ASC
  | typeof TRANSACTION_SORTS.to.id_DESC
  | null;
