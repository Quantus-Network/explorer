import type * as gql from '../__generated__/graphql';

export interface ChainStatus extends gql.SquidStatus {}

export interface ChainStatusResponse {
  status: ChainStatus;
  transactions: {
    totalCount: number;
  };
  activeAccounts: {
    totalCount: number;
  };
  depositAccounts: {
    totalCount: number;
  };
}
