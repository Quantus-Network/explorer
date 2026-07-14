export const RESOURCES = {
  transactions: '/transactions',
  scheduledReversibleTransactions: '/transactions/scheduled-reversible',
  executedReversibleTransactions: '/transactions/executed-reversible',
  cancelledReversibleTransactions: '/transactions/cancelled-reversible',
  accounts: '/accounts',
  blocks: '/blocks',
  minerRewards: '/miner-rewards',
  highSecuritySets: '/high-security-sets',
  errors: '/errors',
  wormhole: '/transactions/wormhole',
  /** Unified Multisig listing. Old listing URLs redirect via Cloudflare (exact path only). */
  multisig: '/multisig',
  /** Detail + deep-link base for wallet creation events (listing redirects to /multisig). */
  multisigCreated: '/multisig-created',
  /** Detail + deep-link base for proposals (listing redirects to /multisig?tab=proposals). */
  multisigProposals: '/multisig-proposals',
  multisigProposalCreated: '/multisig-proposal-created',
  multisigSignerApproved: '/multisig-signer-approved',
  multisigProposalReady: '/multisig-proposal-ready',
  multisigProposalExecuted: '/multisig-proposal-executed',
  multisigProposalCancelled: '/multisig-proposal-cancelled',
  multisigProposalRemoved: '/multisig-proposal-removed',
  multisigDepositsClaimed: '/multisig-deposits-claimed'
} as const;
