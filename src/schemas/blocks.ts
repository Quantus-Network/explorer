import type * as gql from '../__generated__/graphql';
import type { CancelledReversibleTransaction } from './cancelled-reversible-transaction';
import type { ErrorEvent } from './errors';
import type { ExecutedReversibleTransaction } from './executed-reversible-transaction';
import type { HighSecuritySet } from './high-security-set';
import type { ScheduledReversibleTransaction } from './scheduled-reversible-transaction';
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

export interface BlockStatsResponse {
  chain: {
    block_height: number;
    finalized_block_height: number;
  };
  minedIn24Hours: {
    aggregate: {
      totalCount: number;
    };
  };
}
