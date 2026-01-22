import type * as gql from '../__generated__/graphql';
import type { ErrorEvent } from './errors';
import type { HighSecuritySet } from './high-security-set';
import type { MinerReward } from './miner-reward';
import type { ReversibleTransaction } from './reversible-transaction';
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
  reversibleTransactions: {
    edges: BlockReversibleTransaction[];
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

export interface BlockReversibleTransaction {
  node: ReversibleTransaction;
}

export interface BlockHighSecuritySet {
  node: HighSecuritySet;
}

export interface BlockErrorEvent {
  node: ErrorEvent;
}
