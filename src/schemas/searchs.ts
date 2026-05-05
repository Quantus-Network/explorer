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
  transactions: Pick<Transaction, 'extrinsic'>[];
  scheduledReversibleTransactions: Pick<
    ScheduledReversibleTransaction,
    'extrinsic' | 'tx_id'
  >[];
  executedReversibleTransactions: Pick<
    ExecutedReversibleTransaction,
    'tx_id'
  >[];
  cancelledReversibleTransactions: Pick<
    CancelledReversibleTransaction,
    'tx_id'
  >[];
  accounts: Pick<Account, 'id'>[];
  blocks: Pick<Block, 'height'>[];
  highSecuritySets: Pick<HighSecuritySet, 'extrinsic'>[];
  minerRewards: Pick<MinerReward, 'block'>[];
  errorEvents: Pick<ErrorEvent, 'extrinsic'>[];
}
