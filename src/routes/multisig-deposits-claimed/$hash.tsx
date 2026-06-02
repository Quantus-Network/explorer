import { createFileRoute } from '@tanstack/react-router';

import { MultisigDepositsClaimedInformation } from '@/components/features/multisig-deposits-claimed-details/multisig-deposits-claimed-information/MultisigDepositsClaimedInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-deposits-claimed/$hash')({
  component: MultisigDepositsClaimedDetails
});

function MultisigDepositsClaimedDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <div>
          <h1>Deposits Claimed</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed information about a multisig deposit claim event.
          </p>
        </div>
        <MultisigDepositsClaimedInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigDepositsClaimedDetails;
