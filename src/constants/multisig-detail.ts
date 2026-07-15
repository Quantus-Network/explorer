import {
  isMultisigProposalStatusFilter,
  type MultisigProposalStatusFilter
} from '@/constants/multisig-listing';

export const MULTISIG_DETAIL_TABS = ['transactions', 'proposals'] as const;
export type MultisigDetailTab = (typeof MULTISIG_DETAIL_TABS)[number];

export type MultisigDetailSearch = {
  tab: MultisigDetailTab;
  status: MultisigProposalStatusFilter;
};

export const isMultisigDetailTab = (
  value: unknown
): value is MultisigDetailTab =>
  typeof value === 'string' &&
  (MULTISIG_DETAIL_TABS as readonly string[]).includes(value);

export const parseMultisigDetailSearch = (
  search: Record<string, unknown>
): MultisigDetailSearch => {
  const tab = isMultisigDetailTab(search.tab) ? search.tab : 'transactions';
  const status = isMultisigProposalStatusFilter(search.status)
    ? search.status
    : 'all';

  return { tab, status };
};
