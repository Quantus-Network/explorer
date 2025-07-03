import { accounts } from './accounts';
import { blocks } from './blocks';
import { chainStatus } from './chain-status';
import { reversibleTransactions } from './reversible-transactions';
import { search } from './search';
import { transactions } from './transactions';

const api = {
  accounts,
  chainStatus,
  transactions,
  reversibleTransactions,
  search,
  blocks
};

export default api;
