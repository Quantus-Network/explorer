import type * as gql from '../__generated__/graphql';

export interface Transaction extends Omit<gql.Transfer, 'from' | 'to'> {
  from: Pick<gql.Account, 'id'>;
  to: Pick<gql.Account, 'id'>;
}

export interface TransactionResponse {
  transaction: Transaction;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  meta: {
    totalCount: number;
  };
}

export interface RecentTransactionsResponse {
  transactions: Transaction[];
}

export interface TransactionsStatsResponse {
  totalCountPast24Hours: number;
  totalFeePast24Hours: number;
}
