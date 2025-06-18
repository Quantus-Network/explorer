import type * as gql from '../__generated__/graphql';

export interface Transaction extends gql.Transfer {}

export interface TransactionResponse {
  transaction: Transaction;
}

export interface TransactionListResponse {
  transactions: Transaction[];
}
