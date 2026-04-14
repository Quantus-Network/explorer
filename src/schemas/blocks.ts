import type * as gql from '../__generated__/graphql';
import type { CancelledReversibleTransaction } from './cancelled-reversible-transaction';
import type { ErrorEvent } from './errors';
import type { ExecutedReversibleTransaction } from './executed-reversible-transaction';
import type { HighSecuritySet } from './high-security-set';
import type { MinerReward } from './miner-reward';
import type { ScheduledReversibleTransaction } from './scheduled-reversible-transaction';
import type { Transaction } from './transcation';

export interface Block
  extends Pick<gql.Block, 'id' | 'hash' | 'height' | 'timestamp' | 'reward'> {}

export interface BlockResponse {
  blocks: [Block];
  miners: [MinerReward];
  transactions: {
    edges: BlockTransaction[];
    /** @description the grand total of the transactions regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
  scheduledReversibleTransactions: {
    edges: BlockScheduledReversibleTransaction[];
    /** @description the grand total of the transactions regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
  executedReversibleTransactions: {
    edges: BlockExecutedReversibleTransaction[];
    /** @description the grand total of the transactions regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
  cancelledReversibleTransactions: {
    edges: BlockCancelledReversibleTransaction[];
    /** @description the grand total of the transactions regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
  highSecuritySets: {
    edges: BlockHighSecuritySet[];
    /** @description the grand total of the transactions regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
  errorEvents: {
    edges: BlockErrorEvent[];
    /** @description the grand total of the transactions regardless of the return node limit using `first` parameter */
    totalCount: number;
  };
}

export interface BlockListResponse {
  blocks: Block[];
  meta: {
    totalCount: number;
  };
}

export interface RecentBlocksResponse {
  blocks: Block[];
}

export interface BlockTransaction {
  node: Transaction;
}

export interface BlockScheduledReversibleTransaction {
  node: ScheduledReversibleTransaction;
}

export interface BlockExecutedReversibleTransaction {
  node: ExecutedReversibleTransaction;
}

export interface BlockCancelledReversibleTransaction {
  node: CancelledReversibleTransaction;
}

export interface BlockHighSecuritySet {
  node: HighSecuritySet;
}

export interface BlockErrorEvent {
  node: ErrorEvent;
}
