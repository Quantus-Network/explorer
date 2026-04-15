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

// Extrinsic detail response (for /transactions/{hash} page)
export interface ExtrinsicDetail {
  id: string;
  pallet: string;
  call: string;
  success: boolean;
  fee: string;
  timestamp: string;
  indexInBlock: number;
  signer: { id: string } | null;
  block: { height: number };
}

export interface ExtrinsicTransfer {
  id: string;
  amount: string;
  timestamp: string;
  from: { id: string };
  to: { id: string };
}

export interface ExtrinsicDetailResponse {
  extrinsics: ExtrinsicDetail[];
  transfers: ExtrinsicTransfer[];
}
