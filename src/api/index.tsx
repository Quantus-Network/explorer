import { useFetchClient } from '@/hooks/useFetchClient';

import { accounts } from './accounts';
import { blocks } from './blocks';
import { chainStatus } from './chain-status';
import { errors } from './errors';
import { highSecuritySets } from './high-security-sets';
import { minerLeaderboard } from './miner-leaderboard';
import { minerRewards } from './miner-rewards';
import { reversibleTransactions } from './reversible-transactions';
import { search } from './search';
import { transactions } from './transactions';

const useApiClient = () => {
  const fetcher = useFetchClient();

  const api = {
    accounts,
    chainStatus,
    errors,
    transactions,
    reversibleTransactions,
    search: search(fetcher),
    blocks,
    minerRewards,
    minerLeaderboard,
    highSecuritySets
  };

  return api;
};

export default useApiClient;
