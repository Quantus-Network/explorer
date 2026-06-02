import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalCancelledInformation } from '@/components/features/multisig-proposal-cancelled-details/multisig-proposal-cancelled-information/MultisigProposalCancelledInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposal-cancelled/$hash')({
  component: MultisigProposalCancelledDetails
});

function MultisigProposalCancelledDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <div>
          <h1>Proposal Cancelled</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed information about a multisig proposal cancellation event.
          </p>
        </div>
        <MultisigProposalCancelledInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalCancelledDetails;
