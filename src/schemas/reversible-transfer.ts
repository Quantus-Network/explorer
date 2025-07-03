import type * as gql from '../__generated__/graphql';

export interface ReversibleTransaction
  extends Omit<gql.ReversibleTransfer, 'id' | 'who' | 'block' | 'event'> {
  who: Pick<gql.Account, 'id'>;
  block: Pick<gql.Block, 'height'>;
}

export interface ReversibleTransactionResponse {
  reversibleTransactions: [ReversibleTransaction];
}

export interface ReversibleTransactionListResponse {
  reversibleTransactions: ReversibleTransaction[];
  meta: {
    totalCount: number;
  };
}

export interface RecentReversibleTransactionsResponse {
  reversibleTransactions: ReversibleTransaction[];
}

export interface ReversibleTransactionsStatsResponse {
  last24Hour: {
    totalCount: number;
  };
}
