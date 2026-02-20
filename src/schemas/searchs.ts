import type { Account } from './account';
import type { Block } from './blocks';
import type { ErrorEvent } from './errors';
import type { HighSecuritySet } from './high-security-set';
import type { MinerReward } from './miner-reward';
import type { ReversibleTransaction } from './reversible-transaction';
import type { Transaction } from './transcation';

export interface SearchAllResponse {
  transactions: Pick<Transaction, 'extrinsic'>[];
  reversibleTransactions: Pick<ReversibleTransaction, 'extrinsic'>[];
  accounts: Pick<Account, 'id'>[];
  blocks: Pick<Block, 'height'>[];
  highSecuritySets: Pick<HighSecuritySet, 'extrinsic'>[];
  minerRewards: Pick<MinerReward, 'block'>[];
  errorEvents: Pick<ErrorEvent, 'extrinsic'>[];
}
