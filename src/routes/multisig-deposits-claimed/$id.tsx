import { createFileRoute } from '@tanstack/react-router';

import { MultisigDepositsClaimedInformation } from '@/components/features/multisig-deposits-claimed-details/multisig-deposits-claimed-information/MultisigDepositsClaimedInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-deposits-claimed/$id')({
  component: MultisigDepositsClaimedDetails
});

function MultisigDepositsClaimedDetails() {
  const { id } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <div>
          <h1>Deposits Claimed</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed information about a multisig deposit claim event.
          </p>
        </div>
        <MultisigDepositsClaimedInformation id={id} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigDepositsClaimedDetails;
