import { accounts } from './accounts';
import { blocks } from './blocks';
import { chainStatus } from './chain-status';
import { minerRewards } from './miner-rewards';
import { reversibleTransactions } from './reversible-transactions';
import { search } from './search';
import { transactions } from './transactions';

const api = {
  accounts,
  chainStatus,
  transactions,
  reversibleTransactions,
  search,
  blocks,
  minerRewards
};

export default api;
