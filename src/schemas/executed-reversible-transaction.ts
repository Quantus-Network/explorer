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
