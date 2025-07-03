export const REVERSIBLE_TRANSACTION_SORTS = {
  id: {
    ASC: 'id_ASC',
    DESC: 'id_DESC'
  },
  timestamp: {
    ASC: 'timestamp_ASC',
    DESC: 'timestamp_DESC'
  },
  scheduledAt: {
    ASC: 'scheduledAt_ASC',
    DESC: 'scheduledAt_DESC'
  },
  status: {
    ASC: 'status_ASC',
    DESC: 'status_DESC'
  },
  extrinsicHash: {
    ASC: 'extrinsicHash_ASC',
    DESC: 'extrinsicHash_DESC'
  },
  tx: {
    ASC: 'tx_ASC',
    DESC: 'tx_DESC'
  },
  blockHeight: {
    ASC: 'block_height_ASC',
    DESC: 'block_height_DESC'
  },
  who: {
    id_ASC: 'who_id_ASC',
    id_DESC: 'who_id_DESC'
  }
} as const;

export const REVERSIBLE_TRANSACTION_SORTS_LITERALS = Object.values(
  REVERSIBLE_TRANSACTION_SORTS
).flatMap((sort) => Object.values(sort));

export const REVERSIBLE_TRANSACTION_SORTS_KEY = Object.keys(
  REVERSIBLE_TRANSACTION_SORTS
);

// Adding null, because we can sort by null to indicate no sorting
export type ReversibleTransactionSorts =
  | (typeof REVERSIBLE_TRANSACTION_SORTS_LITERALS)[number]
  | null;
