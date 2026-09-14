import type { DocumentNode } from 'graphql';

/** Sample ids from bootstrap queries; all optional. */
export type GraphqlBenchmarkContext = {
  blockHeight?: number;
  blockHash?: string;
  accountId?: string;
  extrinsicHash?: string;
  scheduledTxId?: string;
  executedTxId?: string;
  cancelledTxId?: string;
  wormholeExtrinsicId?: string;
  errorExtrinsicHash?: string;
  highSecurityExtrinsicHash?: string;
  minerBlockHash?: string;
  /** Account with the most immediate transfers (wallet-history worst case). */
  busyAccountId?: string;
  busyImmediateTransfers?: number;
  /** Account with the most mined blocks (receive/all feed worst case). */
  minerAccountId?: string;
  minerMinedBlocks?: number;
  discoveryAccountIds?: string[];
  cursorTimestamp?: string;
  cursorId?: string;
  deepCursorTimestamp?: string;
  deepCursorId?: string;
  minerCursorTimestamp?: string;
  minerCursorId?: string;
  pendingFrom?: string;
  pendingTo?: string;
  pendingAmount?: string;
  pendingBlockHeight?: number;
  pendingReversibleFrom?: string;
  pendingReversibleTo?: string;
  pendingReversibleAmount?: string;
  pendingReversibleBlockHeight?: number;
  scheduledExtrinsicHash?: string;
  wormholeToId?: string;
  wormholeCursorHeight?: number;
  wormholeCursorId?: string;
  nullifierHashes?: string[];
  multisigId?: string;
  multisigSignerIds?: string[];
  proposalId?: number;
  proposalCreatedHash?: string;
  signerApprovedHash?: string;
  executedProposalHash?: string;
  cancelledProposalHash?: string;
};

export type GraphqlBenchmarkSuite = 'explorer' | 'mobile';

export type GraphqlBenchmarkRegistryEntry = {
  name: string;
  document: DocumentNode;
  group?: string;
  getVariables: (
    ctx: GraphqlBenchmarkContext
  ) => Record<string, unknown> | null;
};

export type GraphqlBenchmarkRow = {
  name: string;
  durationMs: number;
  samplesMs?: number[];
  minMs?: number;
  maxMs?: number;
  responseBytes?: number;
  rowCount?: number;
  group?: string;
  skipped?: boolean;
  skipReason?: string;
  errorMessage?: string;
};
