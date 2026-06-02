import { createFileRoute } from '@tanstack/react-router';

import { MultisigSignerApprovedInformation } from '@/components/features/multisig-signer-approved-details/multisig-signer-approved-information/MultisigSignerApprovedInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-signer-approved/$id')({
  component: MultisigSignerApprovedDetails
});

function MultisigSignerApprovedDetails() {
  const { id } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <div>
          <h1>Signer Approved</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed information about a multisig signer approval event.
          </p>
        </div>
        <MultisigSignerApprovedInformation id={id} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigSignerApprovedDetails;
