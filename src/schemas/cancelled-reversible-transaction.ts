import type * as gql from '../__generated__/graphql';
import type { ScheduledReversibleTransaction } from './scheduled-reversible-transaction';

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
