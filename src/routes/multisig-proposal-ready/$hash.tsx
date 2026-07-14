import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalReadyInformation } from '@/components/features/multisig-proposal-ready-details/multisig-proposal-ready-information/MultisigProposalReadyInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-ready/$hash')({
  component: MultisigProposalReadyDetails
});

function MultisigProposalReadyDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1 className="page-title">Proposal Ready</h1>

        <MultisigProposalReadyInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalReadyDetails;
