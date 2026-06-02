import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalRemovedInformation } from '@/components/features/multisig-proposal-removed-details/multisig-proposal-removed-information/MultisigProposalRemovedInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-removed/$id')({
  component: MultisigProposalRemovedDetails
});

function MultisigProposalRemovedDetails() {
  const { id } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <div>
          <h1>Proposal Removed</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed information about a multisig proposal removal event.
          </p>
        </div>
        <MultisigProposalRemovedInformation id={id} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalRemovedDetails;
