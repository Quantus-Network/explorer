import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalRemovedHeading } from '@/components/features/multisig-proposal-removed-listing/multisig-proposal-removed-heading/MultisigProposalRemovedHeading';
import { MultisigProposalRemovedStats } from '@/components/features/multisig-proposal-removed-listing/multisig-proposal-removed-stats/MultisigProposalRemovedStats';
import { MultisigProposalRemovedTable } from '@/components/features/multisig-proposal-removed-listing/multisig-proposal-removed-table/MultisigProposalRemovedTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-removed/')({
  component: MultisigProposalRemovedPage
});

function MultisigProposalRemovedPage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MultisigProposalRemovedHeading />
        <MultisigProposalRemovedStats />
        <MultisigProposalRemovedTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalRemovedPage;
