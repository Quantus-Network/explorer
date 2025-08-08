import type * as gql from '../__generated__/graphql';

export interface ReversibleTransaction
  extends Omit<
    gql.ReversibleTransfer,
    'id' | 'to' | 'from' | 'block' | 'event'
  > {
  to: Pick<gql.Account, 'id'>;
  from: Pick<gql.Account, 'id'>;
  block: Pick<gql.Block, 'height'>;
}

export interface ReversibleTransactionResponse {
  reversibleTransactions: [ReversibleTransaction];
}

export interface ReversibleTransactionStatusResponse {
  reversibleTransactions: [Pick<ReversibleTransaction, 'status'>];
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
  allTime: {
    totalCount: number;
  };
  last24Hour: {
    totalCount: number;
  };
}
