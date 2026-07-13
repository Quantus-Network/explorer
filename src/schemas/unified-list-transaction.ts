import type { Block } from '@/__generated__/graphql';

export type UnifiedListTransactionType =
  | 'IMMEDIATE'
  | 'SCHEDULED_REVERSIBLE'
  | 'EXECUTED_REVERSIBLE'
  | 'CANCELLED_REVERSIBLE'
  | 'WORMHOLE';

export type UnifiedListTransactionStatus =
  | 'SUCCESS'
  | 'ERROR'
  | 'SCHEDULED'
  | 'EXECUTED'
  | 'CANCELLED';

export interface UnifiedListTransaction {
  block: Pick<Block, 'height' | 'hash'>;
  id: string;
  type: UnifiedListTransactionType;
  hash: string | null;
  timestamp: string;
  amount: string | null;
  fee: string | null;
  status: UnifiedListTransactionStatus;
  detail_id: string;
  from: { id: string } | null;
  to: { id: string } | null;
}

export interface UnifiedListTransactionListResponse {
  transactions: UnifiedListTransaction[];
  meta: {
    aggregate: {
      totalCount: number;
    };
  };
}

export interface RecentUnifiedListTransactionsResponse {
  transactions: UnifiedListTransaction[];
}

export interface UnifiedListTransactionsStatsResponse {
  allTime: {
    aggregate: {
      totalCount: number;
    };
  };
  last24Hour: {
    aggregate: {
      totalCount: number;
    };
  };
}
