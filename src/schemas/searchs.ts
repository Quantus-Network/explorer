import type { Account } from './account';
import type { Block } from './blocks';
import type { CancelledReversibleTransaction } from './cancelled-reversible-transaction';
import type { ErrorEvent } from './errors';
import type { ExecutedReversibleTransaction } from './executed-reversible-transaction';
import type { HighSecuritySet } from './high-security-set';
import type { MinerReward } from './miner-reward';
import type { ScheduledReversibleTransaction } from './scheduled-reversible-transaction';
import type { Transaction } from './transcation';

export interface SearchAllResponse {
  transactions: Pick<Transaction, 'extrinsicHash'>[];
  scheduledReversibleTransactions: Pick<
    ScheduledReversibleTransaction,
    'extrinsicHash' | 'txId'
  >[];
  executedReversibleTransactions: Pick<ExecutedReversibleTransaction, 'txId'>[];
  cancelledReversibleTransactions: Pick<
    CancelledReversibleTransaction,
    'txId'
  >[];
  accounts: Pick<Account, 'id'>[];
  blocks: Pick<Block, 'height'>[];
  highSecuritySets: Pick<HighSecuritySet, 'extrinsicHash'>[];
  minerRewards: Pick<MinerReward, 'block'>[];
  errorEvents: Pick<ErrorEvent, 'extrinsicHash'>[];
}
