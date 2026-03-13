import { useFetchClient } from '@/hooks/useFetchClient';

import { accounts } from './accounts';
import { blocks } from './blocks';
import { cancelledReversibleTransactions } from './cancelled-reversible-transactions';
import { chainStatus } from './chain-status';
import { errors } from './errors';
import { executedReversibleTransactions } from './executed-reversible-transactions';
import { highSecuritySets } from './high-security-sets';
import { minerLeaderboard } from './miner-leaderboard';
import { minerRewards } from './miner-rewards';
import { reversibleTransactions } from './reversible-transactions';
import { scheduledReversibleTransactions } from './scheduled-reversible-transactions';
import { search } from './search';
import { transactions } from './transactions';
// import { wormhole } from './wormhole';

const useApiClient = () => {
  const fetcher = useFetchClient();

  const api = {
    accounts,
    chainStatus,
    errors,
    transactions,
    reversibleTransactions,
    scheduledReversibleTransactions,
    executedReversibleTransactions,
    cancelledReversibleTransactions,
    search: search(fetcher),
    blocks,
    minerRewards,
    minerLeaderboard,
    highSecuritySets
    // wormhole
  };

  return api;
};

export default useApiClient;
