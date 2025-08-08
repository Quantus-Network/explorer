import type * as gql from '../__generated__/graphql';

export interface Transaction
  extends Omit<gql.Transfer, 'id' | 'from' | 'to' | 'block' | 'event'> {
  from: Pick<gql.Account, 'id'>;
  to: Pick<gql.Account, 'id'>;
  block: Pick<gql.Block, 'height'>;
}

export interface TransactionResponse {
  transactions: [Transaction];
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
  allTime: {
    totalCount: number;
  };
  last24Hour: {
    totalCount: number;
  };
}
