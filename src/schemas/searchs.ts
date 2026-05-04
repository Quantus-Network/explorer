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
  transactions: { node: Pick<Transaction['node'], 'extrinsic'> }[];
  scheduledReversibleTransactions: {
    node: Pick<ScheduledReversibleTransaction['node'], 'extrinsic' | 'tx_id'>;
  }[];
  executedReversibleTransactions: {
    node: Pick<ExecutedReversibleTransaction['node'], 'tx_id'>;
  }[];
  cancelledReversibleTransactions: {
    node: Pick<CancelledReversibleTransaction['node'], 'tx_id'>;
  }[];
  accounts: Pick<Account, 'id'>[];
  blocks: Pick<Block, 'height'>[];
  highSecuritySets: { node: Pick<HighSecuritySet['node'], 'extrinsic'> }[];
  minerRewards: { node: Pick<MinerReward['node'], 'block'> }[];
  errorEvents: { node: Pick<ErrorEvent['node'], 'extrinsic'> }[];
}
