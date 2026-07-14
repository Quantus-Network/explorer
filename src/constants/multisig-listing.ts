export const MULTISIG_TABS = ['wallets', 'proposals'] as const;
export type MultisigTab = (typeof MULTISIG_TABS)[number];

export const MULTISIG_PROPOSAL_STATUSES = [
  'all',
  'SCHEDULED',
  'APPROVED',
  'EXECUTED',
  'CANCELLED',
  'REMOVED'
] as const;
export type MultisigProposalStatusFilter =
  (typeof MULTISIG_PROPOSAL_STATUSES)[number];

export type MultisigListingSearch = {
  tab: MultisigTab;
  status: MultisigProposalStatusFilter;
  block?: string;
};

export const isMultisigTab = (value: unknown): value is MultisigTab =>
  typeof value === 'string' &&
  (MULTISIG_TABS as readonly string[]).includes(value);

export const isMultisigProposalStatusFilter = (
  value: unknown
): value is MultisigProposalStatusFilter =>
  typeof value === 'string' &&
  (MULTISIG_PROPOSAL_STATUSES as readonly string[]).includes(value);

export const formatMultisigProposalStatusLabel = (
  status: MultisigProposalStatusFilter
) =>
  status === 'all' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase();
