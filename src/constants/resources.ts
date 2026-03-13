export const RESOURCES = {
  transactions: '/immediate-transactions',
  reversibleTransactions: '/reversible-transactions',
  scheduledReversibleTransactions: '/scheduled-reversible-transactions',
  executedReversibleTransactions: '/executed-reversible-transactions',
  cancelledReversibleTransactions: '/cancelled-reversible-transactions',
  accounts: '/accounts',
  blocks: '/blocks',
  minerRewards: '/miner-rewards',
  highSecuritySets: '/high-security-sets',
  errors: '/errors',
  wormhole: '/wormhole'
} as const;
