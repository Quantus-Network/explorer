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
        <h1 className="page-title">Multisig Proposal</h1>

        <MultisigProposalInformation id={id} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigProposalDetailsPage;
