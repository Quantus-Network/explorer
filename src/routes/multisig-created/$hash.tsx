import { createFileRoute } from '@tanstack/react-router';

import { MultisigCreatedInformation } from '@/components/features/multisig-created-details/multisig-created-information/MultisigCreatedInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-created/$hash')({
  component: MultisigCreatedDetails
});

function MultisigCreatedDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1 className="page-title">Multisig Created</h1>

        <MultisigCreatedInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigCreatedDetails;
