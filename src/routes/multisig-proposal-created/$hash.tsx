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
        <div>
          <h1>Proposal Created</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed information about a multisig proposal creation event.
          </p>
        </div>
        <MultisigProposalCreatedInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalCreatedDetails;
