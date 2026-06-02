import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalCancelledHeading } from '@/components/features/multisig-proposal-cancelled-listing/multisig-proposal-cancelled-heading/MultisigProposalCancelledHeading';
import { MultisigProposalCancelledStats } from '@/components/features/multisig-proposal-cancelled-listing/multisig-proposal-cancelled-stats/MultisigProposalCancelledStats';
import { MultisigProposalCancelledTable } from '@/components/features/multisig-proposal-cancelled-listing/multisig-proposal-cancelled-table/MultisigProposalCancelledTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-cancelled/')({
  component: MultisigProposalCancelledPage
});

function MultisigProposalCancelledPage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MultisigProposalCancelledHeading />
        <MultisigProposalCancelledStats />
        <MultisigProposalCancelledTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalCancelledPage;
