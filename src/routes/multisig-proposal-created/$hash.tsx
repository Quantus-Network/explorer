import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalCreatedInformation } from '@/components/features/multisig-proposal-created-details/multisig-proposal-created-information/MultisigProposalCreatedInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-created/$hash')({
  component: MultisigProposalCreatedDetails
});

function MultisigProposalCreatedDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1 className="page-title">Proposal Created</h1>

        <MultisigProposalCreatedInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalCreatedDetails;
