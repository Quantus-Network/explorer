import type * as gql from '../__generated__/graphql';

export interface ChainStatus
  extends Pick<
    gql.Chain_Stats,
    | 'block_height'
    | 'total_accounts'
    | 'total_deposit_accounts'
    | 'total_executed_transfers'
    | 'total_immediate_transfers'
    | 'total_scheduled_transfers'
    | 'total_cancelled_transfers'
  > {}

export interface ChainStatusResponse {
  status: ChainStatus;
}
