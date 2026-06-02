import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalReadyHeading } from '@/components/features/multisig-proposal-ready-listing/multisig-proposal-ready-heading/MultisigProposalReadyHeading';
import { MultisigProposalReadyStats } from '@/components/features/multisig-proposal-ready-listing/multisig-proposal-ready-stats/MultisigProposalReadyStats';
import { MultisigProposalReadyTable } from '@/components/features/multisig-proposal-ready-listing/multisig-proposal-ready-table/MultisigProposalReadyTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-ready/')({
  component: MultisigProposalReadyPage
});

function MultisigProposalReadyPage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MultisigProposalReadyHeading />
        <MultisigProposalReadyStats />
        <MultisigProposalReadyTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalReadyPage;
