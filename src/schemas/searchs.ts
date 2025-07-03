import type { Account } from './account';
import type { Block } from './blocks';
import type { Transaction } from './transcation';

export interface SearchAllResponse {
  transactions: Pick<Transaction, 'extrinsicHash'>[];
  accounts: Pick<Account, 'id'>[];
  blocks: Pick<Block, 'height'>[];
}
