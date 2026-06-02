import { createFileRoute } from '@tanstack/react-router';

import { MultisigDepositsClaimedHeading } from '@/components/features/multisig-deposits-claimed-listing/multisig-deposits-claimed-heading/MultisigDepositsClaimedHeading';
import { MultisigDepositsClaimedStats } from '@/components/features/multisig-deposits-claimed-listing/multisig-deposits-claimed-stats/MultisigDepositsClaimedStats';
import { MultisigDepositsClaimedTable } from '@/components/features/multisig-deposits-claimed-listing/multisig-deposits-claimed-table/MultisigDepositsClaimedTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-deposits-claimed/')({
  component: MultisigDepositsClaimedPage
});

function MultisigDepositsClaimedPage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MultisigDepositsClaimedHeading />
        <MultisigDepositsClaimedStats />
        <MultisigDepositsClaimedTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigDepositsClaimedPage;
