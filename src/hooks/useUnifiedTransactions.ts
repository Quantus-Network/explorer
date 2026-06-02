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
  guardian: { id: string };
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
  guardian: hss.guardian,
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

interface MultisigCreatedInput {
  id: string;
  extrinsic?: ExtrinsicInfo | null;
  timestamp: string;
  block: { height: number };
  creator?: { id: string } | null;
  threshold: number;
  signers: string[];
  nonce: string | number;
}

interface MultisigProposalEventInput {
  id: string;
  extrinsic?: ExtrinsicInfo | null;
  timestamp: string;
  block: { height: number };
  proposal?: {
    id: string;
    proposal_id: number;
    multisig?: { id: string } | null;
    proposer?: { id: string } | null;
  } | null;
}

interface MultisigSignerApprovedInput extends MultisigProposalEventInput {
  approver?: { id: string } | null;
  approvals_count: number;
}

interface MultisigProposalReadyInput extends MultisigProposalEventInput {
  approvals_count: number;
}

interface MultisigProposalExecutedInput extends MultisigProposalEventInput {
  approvers: string[];
  result: string;
}

interface MultisigProposalCancelledInput extends MultisigProposalEventInput {
  cancelledBy?: { id: string } | null;
}

interface MultisigProposalRemovedInput extends MultisigProposalEventInput {
  removedBy?: { id: string } | null;
}

interface MultisigDepositsClaimedInput {
  id: string;
  extrinsic?: ExtrinsicInfo | null;
  timestamp: string;
  block: { height: number };
  multisig?: { id: string } | null;
  claimer?: { id: string } | null;
  total_returned: string | number;
  proposals_removed: number;
}

export const transformMultisigCreated = (
  event: MultisigCreatedInput
): UnifiedTransaction => ({
  id: event.id,
  type: 'multisig-created',
  timestamp: event.timestamp,
  block: event.block,
  extrinsic: event.extrinsic,
  creator: event.creator ?? undefined,
  threshold: event.threshold,
  signers: event.signers,
  nonce: event.nonce
});

export const transformMultisigProposalCreated = (
  event: MultisigProposalEventInput
): UnifiedTransaction => ({
  id: event.id,
  type: 'multisig-proposal-created',
  timestamp: event.timestamp,
  block: event.block,
  extrinsic: event.extrinsic,
  proposalId: event.proposal?.proposal_id,
  multisig: event.proposal?.multisig ?? undefined,
  proposer: event.proposal?.proposer ?? undefined
});

export const transformMultisigSignerApproved = (
  event: MultisigSignerApprovedInput
): UnifiedTransaction => ({
  id: event.id,
  type: 'multisig-signer-approved',
  timestamp: event.timestamp,
  block: event.block,
  extrinsic: event.extrinsic,
  proposalId: event.proposal?.proposal_id,
  multisig: event.proposal?.multisig ?? undefined,
  proposer: event.proposal?.proposer ?? undefined,
  approver: event.approver ?? undefined,
  approvalsCount: event.approvals_count
});

export const transformMultisigProposalReady = (
  event: MultisigProposalReadyInput
): UnifiedTransaction => ({
  id: event.id,
  type: 'multisig-proposal-ready',
  timestamp: event.timestamp,
  block: event.block,
  extrinsic: event.extrinsic,
  proposalId: event.proposal?.proposal_id,
  multisig: event.proposal?.multisig ?? undefined,
  proposer: event.proposal?.proposer ?? undefined,
  approvalsCount: event.approvals_count
});

export const transformMultisigProposalExecuted = (
  event: MultisigProposalExecutedInput
): UnifiedTransaction => ({
  id: event.id,
  type: 'multisig-proposal-executed',
  timestamp: event.timestamp,
  block: event.block,
  extrinsic: event.extrinsic,
  proposalId: event.proposal?.proposal_id,
  multisig: event.proposal?.multisig ?? undefined,
  proposer: event.proposal?.proposer ?? undefined,
  approvers: event.approvers,
  result: event.result
});

export const transformMultisigProposalCancelled = (
  event: MultisigProposalCancelledInput
): UnifiedTransaction => ({
  id: event.id,
  type: 'multisig-proposal-cancelled',
  timestamp: event.timestamp,
  block: event.block,
  extrinsic: event.extrinsic,
  proposalId: event.proposal?.proposal_id,
  multisig: event.proposal?.multisig ?? undefined,
  proposer: event.proposal?.proposer ?? undefined,
  cancelledBy: event.cancelledBy ?? undefined
});

export const transformMultisigProposalRemoved = (
  event: MultisigProposalRemovedInput
): UnifiedTransaction => ({
  id: event.id,
  type: 'multisig-proposal-removed',
  timestamp: event.timestamp,
  block: event.block,
  extrinsic: event.extrinsic,
  proposalId: event.proposal?.proposal_id,
  multisig: event.proposal?.multisig ?? undefined,
  proposer: event.proposal?.proposer ?? undefined,
  removedBy: event.removedBy ?? undefined
});

export const transformMultisigDepositsClaimed = (
  event: MultisigDepositsClaimedInput
): UnifiedTransaction => ({
  id: event.id,
  type: 'multisig-deposits-claimed',
  timestamp: event.timestamp,
  block: event.block,
  extrinsic: event.extrinsic,
  multisig: event.multisig ?? undefined,
  claimer: event.claimer ?? undefined,
  totalReturned: event.total_returned,
  proposalsRemoved: event.proposals_removed
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
