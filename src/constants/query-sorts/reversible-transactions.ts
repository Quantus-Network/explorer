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
  extrinsic: {
    ASC: 'extrinsic_id_ASC',
    DESC: 'extrinsic_id_DESC'
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

export const SCHEDULED_REVERSIBLE_TRANSACTION_SORTS = {
  timestamp: {
    ASC: 'timestamp_ASC',
    DESC: 'timestamp_DESC'
  },
  scheduledAt: {
    ASC: 'scheduledAt_ASC',
    DESC: 'scheduledAt_DESC'
  },
  amount: {
    ASC: 'amount_ASC',
    DESC: 'amount_DESC'
  }
} as const;

export const SCHEDULED_REVERSIBLE_TRANSACTION_SORTS_LITERALS = Object.values(
  SCHEDULED_REVERSIBLE_TRANSACTION_SORTS
).flatMap((sort) => Object.values(sort));

export type ScheduledReversibleTransactionSorts =
  | (typeof SCHEDULED_REVERSIBLE_TRANSACTION_SORTS_LITERALS)[number]
  | null;

export const EXECUTED_REVERSIBLE_TRANSACTION_SORTS = {
  timestamp: {
    ASC: 'timestamp_ASC',
    DESC: 'timestamp_DESC'
  }
} as const;

export const EXECUTED_REVERSIBLE_TRANSACTION_SORTS_LITERALS = Object.values(
  EXECUTED_REVERSIBLE_TRANSACTION_SORTS
).flatMap((sort) => Object.values(sort));

export type ExecutedReversibleTransactionSorts =
  | (typeof EXECUTED_REVERSIBLE_TRANSACTION_SORTS_LITERALS)[number]
  | null;

export const CANCELLED_REVERSIBLE_TRANSACTION_SORTS = {
  timestamp: {
    ASC: 'timestamp_ASC',
    DESC: 'timestamp_DESC'
  }
} as const;

export const CANCELLED_REVERSIBLE_TRANSACTION_SORTS_LITERALS = Object.values(
  CANCELLED_REVERSIBLE_TRANSACTION_SORTS
).flatMap((sort) => Object.values(sort));

export type CancelledReversibleTransactionSorts =
  | (typeof CANCELLED_REVERSIBLE_TRANSACTION_SORTS_LITERALS)[number]
  | null;
