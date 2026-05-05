import type { WormholeOutput } from './wormhole';

// All possible transaction types across account and block views
export type UnifiedTransactionType =
  | 'immediate'
  | 'scheduled-reversible'
  | 'executed-reversible'
  | 'cancelled-reversible'
  | 'miner-reward'
  | 'high-security'
  | 'wormhole'
  | 'error';

// Extrinsic info embedded in transactions
export interface ExtrinsicInfo {
  id: string;
  pallet: string;
  call: string;
}

// Single unified transaction interface for all contexts
export interface UnifiedTransaction {
  id: string;
  type: UnifiedTransactionType;
  timestamp: string;
  block: { height: number; hash?: string };
  extrinsic?: ExtrinsicInfo | null;

  // Transfer fields (immediate/reversible)
  from?: { id: string };
  to?: { id: string };
  amount?: string | number;
  fee?: number;

  // Miner reward fields
  reward?: string;
  miner?: { id: string };

  // High security set fields
  who?: { id: string };
  interceptor?: { id: string };
  delay?: number;

  // Wormhole fields
  totalAmount?: string;
  outputCount?: number;
  outputs?: WormholeOutput[];

  // Error event fields
  errorType?: string;
  errorName?: string | null;
  errorModule?: string | null;
  errorDocs?: string | null;
}
