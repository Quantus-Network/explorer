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

export const TRANSACTION_SORTS_LITERALS = Object.values(
  TRANSACTION_SORTS
).flatMap((sort) => Object.values(sort));

export const TRANSACTION_SORTS_KEY = Object.keys(TRANSACTION_SORTS);

// Adding null, because we can sort by null to indicate no sorting
export type TransactionSorts =
  | (typeof TRANSACTION_SORTS_LITERALS)[number]
  | null;
