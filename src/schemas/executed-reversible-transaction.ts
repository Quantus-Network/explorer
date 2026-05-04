import type * as gql from '../__generated__/graphql';
import type { ScheduledReversibleTransaction } from './scheduled-reversible-transaction';

export interface ExecutedReversibleTransaction
  extends Omit<
    gql.Executed_Reversible_Transfer,
    'id' | 'block' | 'event' | 'executedTransfer' | 'scheduledTransfer'
  > {
  block: Pick<gql.Block, 'height'>;
  scheduledTransfer: ScheduledReversibleTransaction;
}

export interface ExecutedReversibleTransactionResponse {
  executedReversibleTransactions: [ExecutedReversibleTransaction];
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

export interface ExecutedReversibleTransactionsStatsResponse {
  allTime: {
    totalCount: number;
  };
  last24Hour: {
    totalCount: number;
  };
}
