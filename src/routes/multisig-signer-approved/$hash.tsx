import { createFileRoute } from '@tanstack/react-router';

import { MultisigSignerApprovedInformation } from '@/components/features/multisig-signer-approved-details/multisig-signer-approved-information/MultisigSignerApprovedInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-signer-approved/$hash')({
  component: MultisigSignerApprovedDetails
});

function MultisigSignerApprovedDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1 className="page-title">Signer Approved</h1>

        <MultisigSignerApprovedInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigSignerApprovedDetails;
