import type {
  CancelledReversibleTransaction,
  ExecutedReversibleTransaction,
  HighSecuritySet,
  MinerReward,
  ScheduledReversibleTransaction,
  Transaction
} from '@/schemas';
import type {
  ExtrinsicInfo,
  UnifiedTransaction,
  UnifiedTransactionType
} from '@/schemas/unified-transaction';
import type { WormholeOutput } from '@/schemas/wormhole';

// Common transformer input types
interface WormholeInput {
  id: string;
  extrinsic?: ExtrinsicInfo | null;
  timestamp: string;
  totalAmount: string;
  outputCount: number;
  outputs?: WormholeOutput[];
  block: { height: number };
}

interface ErrorEventInput {
  extrinsic?: ExtrinsicInfo | null;
  timestamp: string;
  errorType: string;
  errorName?: string | null;
  errorModule?: string | null;
  errorDocs?: string | null;
  block: { height: number };
}

// Transformer functions
export const transformImmediateTransaction = (
  tx: Transaction,
  idx: number
): UnifiedTransaction => ({
  id: `immediate-${tx.node.extrinsic?.id ?? idx}`,
  type: 'immediate' as UnifiedTransactionType,
  timestamp: tx.node.timestamp,
  block: tx.node.block,
  extrinsic: tx.node.extrinsic,
  from: tx.node.from,
  to: tx.node.to,
  amount: Number(tx.node.amount),
  fee: Number(tx.node.fee)
});

export const transformScheduledTransaction = (
  tx: ScheduledReversibleTransaction
): UnifiedTransaction => ({
  id: `scheduled-${tx.node.tx_id}`,
  type: 'scheduled-reversible' as UnifiedTransactionType,
  timestamp: tx.node.timestamp,
  block: tx.node.block,
  extrinsic: tx.node.extrinsic,
  from: tx.node.from,
  to: tx.node.to,
  amount: Number(tx.node.amount),
  scheduled_at: tx.node.scheduled_at
});

export const transformExecutedTransaction = (
  tx: ExecutedReversibleTransaction
): UnifiedTransaction => ({
  id: `executed-${tx.node.tx_id}`,
  type: 'executed-reversible' as UnifiedTransactionType,
  timestamp: tx.node.timestamp,
  block: tx.node.block,
  extrinsic: {
    id: 'N/A (unsigned)',
    pallet: 'ReversibleTransfers',
    call: 'transaction_executed'
  },
  from: tx.node.scheduledTransfer.from,
  to: tx.node.scheduledTransfer.to,
  amount: Number(tx.node.scheduledTransfer.amount)
});

export const transformCancelledTransaction = (
  tx: CancelledReversibleTransaction
): UnifiedTransaction => ({
  id: `cancelled-${tx.node.tx_id}`,
  type: 'cancelled-reversible' as UnifiedTransactionType,
  timestamp: tx.node.timestamp,
  block: tx.node.block,
  extrinsic: tx.node.extrinsic,
  from: tx.node.scheduledTransfer.from,
  to: tx.node.scheduledTransfer.to,
  amount: Number(tx.node.scheduledTransfer.amount)
});

export const transformMinerReward = (
  reward: MinerReward,
  idx: number
): UnifiedTransaction => ({
  id: `miner-reward-${reward.node.block?.hash ?? idx}`,
  type: 'miner-reward' as UnifiedTransactionType,
  timestamp: reward.node.timestamp,
  block: reward.node.block,
  reward: String(reward.node.reward),
  miner: reward.node.miner
});

export const transformHighSecuritySet = (
  hss: HighSecuritySet,
  idx: number
): UnifiedTransaction => ({
  id: `high-security-${hss.node.extrinsic?.id ?? idx}`,
  type: 'high-security' as UnifiedTransactionType,
  timestamp: hss.node.timestamp,
  block: hss.node.block,
  extrinsic: hss.node.extrinsic,
  who: hss.node.who,
  interceptor: hss.node.interceptor,
  delay: hss.node.delay
});

export const transformWormholeOutput = (
  wormhole: WormholeInput,
  idx: number
): UnifiedTransaction => ({
  id: wormhole.id ?? `wormhole-${idx}`,
  type: 'wormhole' as UnifiedTransactionType,
  timestamp: wormhole.timestamp,
  block: wormhole.block,
  extrinsic: wormhole.extrinsic,
  totalAmount: wormhole.totalAmount,
  outputCount: wormhole.outputCount,
  outputs: wormhole.outputs
});

export const transformErrorEvent = (
  err: ErrorEventInput,
  idx: number
): UnifiedTransaction => ({
  id: `error-${err.extrinsic?.id ?? idx}`,
  type: 'error' as UnifiedTransactionType,
  timestamp: err.timestamp,
  block: err.block,
  extrinsic: err.extrinsic,
  errorType: err.errorType,
  errorName: err.errorName,
  errorModule: err.errorModule,
  errorDocs: err.errorDocs
});

// Sort transactions by timestamp descending
export const sortByTimestampDesc = (
  transactions: UnifiedTransaction[]
): UnifiedTransaction[] => {
  return [...transactions].sort((a, b) => {
    const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return timeB - timeA;
  });
};
