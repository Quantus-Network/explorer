import type * as gql from '../__generated__/graphql';
import type { ScheduledReversibleTransaction } from './scheduled-reversible-transaction';

export interface CancelledReversibleTransaction
  extends Omit<
    gql.Cancelled_Reversible_Transfer,
    'id' | 'block' | 'event' | 'cancelledBy' | 'scheduledTransfer'
  > {
  block: Pick<gql.Block, 'height'>;
  cancelledBy: Pick<gql.Account, 'id'>;
  scheduledTransfer: ScheduledReversibleTransaction;
}

export interface CancelledReversibleTransactionResponse {
  cancelledReversibleTransactions: [CancelledReversibleTransaction];
}

export interface CancelledReversibleTransactionListResponse {
  cancelledReversibleTransactions: CancelledReversibleTransaction[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface RecentCancelledReversibleTransactionsResponse {
  cancelledReversibleTransactions: CancelledReversibleTransaction[];
}

export interface CancelledReversibleTransactionsStatsResponse {
  allTime: {
    total_cancelled_transfers: number;
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
