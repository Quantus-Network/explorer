import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalExecutedInformation } from '@/components/features/multisig-proposal-executed-details/multisig-proposal-executed-information/MultisigProposalExecutedInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-executed/$hash')({
  component: MultisigProposalExecutedDetails
});

function MultisigProposalExecutedDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1 className="page-title">Proposal Executed</h1>

        <MultisigProposalExecutedInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalExecutedDetails;
