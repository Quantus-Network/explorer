import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalReadyInformation } from '@/components/features/multisig-proposal-ready-details/multisig-proposal-ready-information/MultisigProposalReadyInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-ready/$id')({
  component: MultisigProposalReadyDetails
});

function MultisigProposalReadyDetails() {
  const { id } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <div>
          <h1>Proposal Ready</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed information about a multisig proposal ready event.
          </p>
        </div>
        <MultisigProposalReadyInformation id={id} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalReadyDetails;
