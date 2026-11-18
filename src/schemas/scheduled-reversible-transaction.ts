import type * as gql from '../__generated__/graphql';

export interface ScheduledReversibleTransaction
  extends Omit<
    gql.Scheduled_Reversible_Transfer,
    'id' | 'block' | 'event' | 'from' | 'to'
  > {
  block: Pick<gql.Block, 'height'>;
  from: Pick<gql.Account, 'id'>;
  to: Pick<gql.Account, 'id'>;
}

export interface ScheduledReversibleTransactionResponse {
  scheduledReversibleTransactions: [ScheduledReversibleTransaction];
}

export interface PendingInboundTransfersResponse {
  scheduled: Pick<
    gql.Scheduled_Reversible_Transfer,
    'id' | 'amount' | 'from_id' | 'to_id'
  >[];
  executed: Pick<gql.Executed_Reversible_Transfer, 'scheduled_transfer_id'>[];
  cancelled: Pick<gql.Cancelled_Reversible_Transfer, 'scheduled_transfer_id'>[];
}
