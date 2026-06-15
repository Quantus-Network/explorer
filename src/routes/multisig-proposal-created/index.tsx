import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalCreatedHeading } from '@/components/features/multisig-proposal-created-listing/multisig-proposal-created-heading/MultisigProposalCreatedHeading';
import { MultisigProposalCreatedStats } from '@/components/features/multisig-proposal-created-listing/multisig-proposal-created-stats/MultisigProposalCreatedStats';
import { MultisigProposalCreatedTable } from '@/components/features/multisig-proposal-created-listing/multisig-proposal-created-table/MultisigProposalCreatedTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-created/')({
  component: MultisigProposalCreatedPage
});

function MultisigProposalCreatedPage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MultisigProposalCreatedHeading />
        <MultisigProposalCreatedStats />
        <MultisigProposalCreatedTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalCreatedPage;
