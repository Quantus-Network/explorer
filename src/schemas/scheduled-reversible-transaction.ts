import type * as gql from '../__generated__/graphql';

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
