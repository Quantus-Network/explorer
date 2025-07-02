import type * as gql from '../__generated__/graphql';
import type { Transaction } from './transcation';

export interface Block
  extends Pick<gql.Block, 'id' | 'hash' | 'height' | 'timestamp'> {}

export interface BlockResponse {
  blocks: [Block];
  transactions: {
    edges: BlockTransaction[];
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
