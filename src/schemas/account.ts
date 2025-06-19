import type * as gql from '../__generated__/graphql';

export interface Account extends Pick<gql.Account, 'id' | 'balance'> {}

export interface AccountResponse {
  account: Account;
}

export interface AccountListResponse {
  accounts: Account[];
  meta: {
    totalCount: number;
  };
}
