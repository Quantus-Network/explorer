import { createFileRoute } from '@tanstack/react-router';

import { MultisigDataTabs } from '@/components/features/multisig-listing/MultisigDataTabs';
import { MultisigHeading } from '@/components/features/multisig-listing/MultisigHeading';
import { MultisigStats } from '@/components/features/multisig-listing/MultisigStats';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import {
  isMultisigProposalStatusFilter,
  isMultisigTab,
  type MultisigListingSearch
} from '@/constants/multisig-listing';

export const Route = createFileRoute('/multisig/')({
  validateSearch: (search: Record<string, unknown>): MultisigListingSearch => {
    const tab = isMultisigTab(search.tab) ? search.tab : 'wallets';
    const status = isMultisigProposalStatusFilter(search.status)
      ? search.status
      : 'all';
    const block =
      typeof search.block === 'string' && search.block.length > 0
        ? search.block
        : undefined;

    return { tab, status, ...(block ? { block } : {}) };
  },
  component: MultisigPage
});

function MultisigPage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MultisigHeading />
        <MultisigStats />
        <MultisigDataTabs />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigPage;
