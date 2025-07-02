import { accounts } from './accounts';
import { blocks } from './blocks';
import { chainStatus } from './chain-status';
import { search } from './search';
import { transactions } from './transactions';

const api = {
  accounts,
  chainStatus,
  transactions,
  search,
  blocks
};

export default api;
