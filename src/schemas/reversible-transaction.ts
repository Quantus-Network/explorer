import type * as gql from '../__generated__/graphql';

// Scheduled Reversible Transactions
export interface ScheduledReversibleTransaction
  extends Omit<
    gql.ScheduledReversibleTransfer,
    'id' | 'block' | 'event' | 'from' | 'to'
  > {
  block: Pick<gql.Block, 'height'>;
  from: Pick<gql.Account, 'id'>;
  to: Pick<gql.Account, 'id'>;
}

export interface ScheduledReversibleTransactionListResponse {
  scheduledReversibleTransactions: ScheduledReversibleTransaction[];
  meta: {
    totalCount: number;
  };
}

export interface RecentScheduledReversibleTransactionsResponse {
  scheduledReversibleTransactions: ScheduledReversibleTransaction[];
}

// Executed Reversible Transactions
export interface ExecutedReversibleTransaction
  extends Omit<
    gql.ExecutedReversibleTransfer,
    'id' | 'block' | 'event' | 'executedTransfer' | 'scheduledTransfer'
  > {
  block: Pick<gql.Block, 'height'>;
  scheduledTransfer: ScheduledReversibleTransaction;
}

export interface ExecutedReversibleTransactionListResponse {
  executedReversibleTransactions: ExecutedReversibleTransaction[];
  meta: {
    totalCount: number;
  };
}

export interface RecentExecutedReversibleTransactionsResponse {
  executedReversibleTransactions: ExecutedReversibleTransaction[];
}

// Cancelled Reversible Transactions
export interface CancelledReversibleTransaction
  extends Omit<
    gql.CancelledReversibleTransfer,
    'id' | 'block' | 'event' | 'cancelledBy' | 'scheduledTransfer'
  > {
  block: Pick<gql.Block, 'height'>;
  cancelledBy: Pick<gql.Account, 'id'>;
  scheduledTransfer: ScheduledReversibleTransaction;
}

export interface CancelledReversibleTransactionListResponse {
  cancelledReversibleTransactions: CancelledReversibleTransaction[];
  meta: {
    totalCount: number;
  };
}

export interface RecentCancelledReversibleTransactionsResponse {
  cancelledReversibleTransactions: CancelledReversibleTransaction[];
}
