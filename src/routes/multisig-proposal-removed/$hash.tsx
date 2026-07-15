import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalRemovedInformation } from '@/components/features/multisig-proposal-removed-details/multisig-proposal-removed-information/MultisigProposalRemovedInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-removed/$hash')({
  component: MultisigProposalRemovedDetails
});

function MultisigProposalRemovedDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1 className="page-title">Proposal Removed</h1>

        <MultisigProposalRemovedInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalRemovedDetails;
