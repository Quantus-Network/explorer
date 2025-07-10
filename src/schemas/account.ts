import type * as gql from '../__generated__/graphql';
import type { Transaction } from './transcation';

export interface Account
  extends Pick<gql.Account, 'id' | 'free' | 'frozen' | 'reserved'> {}

export interface AccountResponse {
  account: Account;
  transactions: {
    edges: AccountTransaction[];
    /** @description the grand total of the transactions regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
}

export interface AccountListResponse {
  accounts: Account[];
  meta: {
    totalCount: number;
  };
}

export interface AccountTransaction {
  node: Transaction;
}
