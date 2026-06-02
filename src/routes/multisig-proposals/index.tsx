import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalHeading } from '@/components/features/multisig-proposal-listing/multisig-proposal-heading/MultisigProposalHeading';
import { MultisigProposalStats } from '@/components/features/multisig-proposal-listing/multisig-proposal-stats/MultisigProposalStats';
import { MultisigProposalTable } from '@/components/features/multisig-proposal-listing/multisig-proposal-table/MultisigProposalTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposals/')({
  component: MultisigProposalsPage
});

function MultisigProposalsPage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MultisigProposalHeading />
        <MultisigProposalStats />
        <MultisigProposalTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalsPage;
