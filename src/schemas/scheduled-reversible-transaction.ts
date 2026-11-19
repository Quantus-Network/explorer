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

interface RowTotal {
  aggregate: { count: number };
}

export interface PendingInboundTransfersCursors {
  scheduled_after: string;
  executed_after: string;
  cancelled_after: string;
}

export interface PendingInboundTransfersVariables
  extends PendingInboundTransfersCursors {
  to_id: string;
}

export interface PendingInboundTransfersResponse {
  scheduled: Pick<
    gql.Scheduled_Reversible_Transfer,
    'id' | 'amount' | 'from_id' | 'to_id'
  >[];
  executed: Pick<
    gql.Executed_Reversible_Transfer,
    'id' | 'scheduled_transfer_id'
  >[];
  cancelled: Pick<
    gql.Cancelled_Reversible_Transfer,
    'id' | 'scheduled_transfer_id'
  >[];
  scheduledTotal: RowTotal;
  executedTotal: RowTotal;
  cancelledTotal: RowTotal;
}
