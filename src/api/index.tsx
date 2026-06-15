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
import { multisigCreated } from './multisig-created';
import { multisigDepositsClaimed } from './multisig-deposits-claimed';
import { multisigProposalCancelled } from './multisig-proposal-cancelled';
import { multisigProposalCreated } from './multisig-proposal-created';
import { multisigProposalExecuted } from './multisig-proposal-executed';
import { multisigProposalReady } from './multisig-proposal-ready';
import { multisigProposalRemoved } from './multisig-proposal-removed';
import { multisigProposals } from './multisig-proposals';
import { multisigSignerApproved } from './multisig-signer-approved';
import { scheduledReversibleTransactions } from './scheduled-reversible-transactions';
import { search } from './search';
import { transactions } from './transactions';
import { wormhole } from './wormhole';

const useApiClient = () => {
  const fetcher = useFetchClient();

  const api = {
    accounts,
    chainStatus,
    errors,
    transactions,
    scheduledReversibleTransactions,
    executedReversibleTransactions,
    cancelledReversibleTransactions,
    search: search(fetcher),
    blocks,
    minerRewards,
    minerLeaderboard,
    highSecuritySets,
    wormhole,
    multisigCreated,
    multisigProposalCreated,
    multisigProposals,
    multisigSignerApproved,
    multisigProposalReady,
    multisigProposalExecuted,
    multisigProposalCancelled,
    multisigProposalRemoved,
    multisigDepositsClaimed
  };

  return api;
};

export default useApiClient;
