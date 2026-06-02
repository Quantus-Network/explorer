import { createFileRoute } from '@tanstack/react-router';

import { MultisigProposalInformation } from '@/components/features/multisig-proposal-details/multisig-proposal-information/MultisigProposalInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-proposals/$id')({
  component: MultisigProposalDetailsPage
});

function MultisigProposalDetailsPage() {
  const { id } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Multisig Proposal</h1>
        <p className="text-sm text-muted-foreground">
          Proposal state and related lifecycle events.
        </p>
        <MultisigProposalInformation id={id} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalDetailsPage;
