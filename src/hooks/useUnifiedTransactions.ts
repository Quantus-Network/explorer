import type {
  CancelledReversibleTransaction,
  ExecutedReversibleTransaction,
  ScheduledReversibleTransaction
} from '@/schemas';
import type {
  ExtrinsicInfo,
  UnifiedTransaction,
  UnifiedTransactionType
} from '@/schemas/unified-transaction';
import type { WormholeOutput } from '@/schemas/wormhole';

// Common transformer input types
interface TransferInput {
  extrinsic?: ExtrinsicInfo | null;
  timestamp: string;
  amount: number;
  fee?: number;
  from: { id: string };
  to: { id: string };
  block: { height: number };
}

interface MinerRewardInput {
  reward: string | number;
  timestamp: string;
  miner: { id: string };
  block: { height: number; hash?: string };
}

interface HighSecuritySetInput {
  extrinsic?: ExtrinsicInfo | null;
  timestamp: string;
  who: { id: string };
  interceptor: { id: string };
  delay?: number;
  block: { height: number };
}

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
  tx: TransferInput,
  idx: number
): UnifiedTransaction => ({
  id: `immediate-${tx.extrinsic?.id ?? idx}`,
  type: 'immediate' as UnifiedTransactionType,
  timestamp: tx.timestamp,
  block: tx.block,
  extrinsic: tx.extrinsic,
  from: tx.from,
  to: tx.to,
  amount: tx.amount,
  fee: tx.fee
});

export const transformScheduledTransaction = (
  tx: ScheduledReversibleTransaction
): UnifiedTransaction => ({
  id: `scheduled-${tx.tx_id}`,
  type: 'scheduled-reversible' as UnifiedTransactionType,
  timestamp: tx.timestamp,
  block: tx.block,
  extrinsic: tx.extrinsic,
  from: tx.from,
  to: tx.to,
  amount: tx.amount
});

export const transformExecutedTransaction = (
  tx: ExecutedReversibleTransaction
): UnifiedTransaction => ({
  id: `executed-${tx.tx_id}`,
  type: 'executed-reversible' as UnifiedTransactionType,
  timestamp: tx.timestamp,
  block: tx.block,
  extrinsic: {
    id: 'N/A (unsigned)',
    pallet: 'ReversibleTransfers',
    call: 'transaction_executed'
  },
  from: tx.scheduledTransfer.from,
  to: tx.scheduledTransfer.to,
  amount: tx.scheduledTransfer.amount
});

export const transformCancelledTransaction = (
  tx: CancelledReversibleTransaction
): UnifiedTransaction => ({
  id: `cancelled-${tx.tx_id}`,
  type: 'cancelled-reversible' as UnifiedTransactionType,
  timestamp: tx.timestamp,
  block: tx.block,
  extrinsic: tx.extrinsic,
  from: tx.scheduledTransfer.from,
  to: tx.scheduledTransfer.to,
  amount: tx.scheduledTransfer.amount
});

export const transformMinerReward = (
  reward: MinerRewardInput,
  idx: number
): UnifiedTransaction => ({
  id: `miner-reward-${reward.block?.hash ?? idx}`,
  type: 'miner-reward' as UnifiedTransactionType,
  timestamp: reward.timestamp,
  block: reward.block,
  reward: String(reward.reward),
  miner: reward.miner
});

export const transformHighSecuritySet = (
  hss: HighSecuritySetInput,
  idx: number
): UnifiedTransaction => ({
  id: `high-security-${hss.extrinsic?.id ?? idx}`,
  type: 'high-security' as UnifiedTransactionType,
  timestamp: hss.timestamp,
  block: hss.block,
  extrinsic: hss.extrinsic,
  who: hss.who,
  interceptor: hss.interceptor,
  delay: hss.delay
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
