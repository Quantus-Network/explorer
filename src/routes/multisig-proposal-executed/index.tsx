import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalExecutedHeading } from '@/components/features/multisig-proposal-executed-listing/multisig-proposal-executed-heading/MultisigProposalExecutedHeading';
import { MultisigProposalExecutedStats } from '@/components/features/multisig-proposal-executed-listing/multisig-proposal-executed-stats/MultisigProposalExecutedStats';
import { MultisigProposalExecutedTable } from '@/components/features/multisig-proposal-executed-listing/multisig-proposal-executed-table/MultisigProposalExecutedTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-executed/')({
  component: MultisigProposalExecutedPage
});

function MultisigProposalExecutedPage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MultisigProposalExecutedHeading />
        <MultisigProposalExecutedStats />
        <MultisigProposalExecutedTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalExecutedPage;
