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
};

export type GraphqlBenchmarkRegistryEntry = {
  name: string;
  document: DocumentNode;
  getVariables: (
    ctx: GraphqlBenchmarkContext
  ) => Record<string, unknown> | null;
};

export type GraphqlBenchmarkRow = {
  name: string;
  durationMs: number;
  responseBytes?: number;
  skipped?: boolean;
  skipReason?: string;
  errorMessage?: string;
};
