import type * as gql from '../__generated__/graphql';
import type { ErrorEvent } from './errors';
import type { HighSecuritySet } from './high-security-set';
import type { ReversibleTransaction } from './reversible-transaction';
import type { Transaction } from './transcation';
import type { WormholeOutput } from './wormhole';

// Extrinsic for block listing (minimal)
export interface BlockExtrinsicMinimal {
  id: string;
}

// Extrinsic for block details (full)
export interface BlockExtrinsic {
  id: string;
  pallet: string;
  call: string;
  success: boolean;
  fee: string;
  timestamp: string;
  indexInBlock: number;
  signer: { id: string } | null;
}

export interface Block
  extends Pick<gql.Block, 'id' | 'hash' | 'height' | 'timestamp' | 'reward'> {
  extrinsics: BlockExtrinsicMinimal[] | BlockExtrinsic[];
}

// Full miner reward for block response (includes all fields needed for unified table)
export interface BlockMinerReward {
  reward: string | number;
  timestamp: string;
  miner: { id: string };
  block: { height: number; hash: string };
}

// Wormhole extrinsic for block response
export interface BlockWormholeExtrinsic {
  id: string;
  extrinsic: {
    id: string;
    pallet: string;
    call: string;
  } | null;
  totalAmount: string;
  outputCount: number;
  timestamp: string;
  block: { height: number };
  outputs: WormholeOutput[];
}

export interface BlockResponse {
  blocks: [Block];
  minerRewards: BlockMinerReward[];
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
  wormholeExtrinsics: BlockWormholeExtrinsic[];
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
