import type * as gql from '../__generated__/graphql';

export interface ChainStatus extends gql.SquidStatus {}

export interface ChainStatusResponse {
  status: ChainStatus;
  transactions: {
    totalCount: number;
  };
  minedBlocks24Hours: {
    totalCount: number;
  };
  scheduledReversibleTransactions: {
    totalCount: number;
  };
  executedReversibleTransactions: {
    totalCount: number;
  };
  cancelledReversibleTransactions: {
    totalCount: number;
  };
  allActiveAccounts: {
    totalCount: number;
  };
  allDepositAccounts: {
    totalCount: number;
  };
}
