import { createFileRoute } from '@tanstack/react-router';

import { MultisigSignerApprovedHeading } from '@/components/features/multisig-signer-approved-listing/multisig-signer-approved-heading/MultisigSignerApprovedHeading';
import { MultisigSignerApprovedStats } from '@/components/features/multisig-signer-approved-listing/multisig-signer-approved-stats/MultisigSignerApprovedStats';
import { MultisigSignerApprovedTable } from '@/components/features/multisig-signer-approved-listing/multisig-signer-approved-table/MultisigSignerApprovedTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-signer-approved/')({
  component: MultisigSignerApprovedPage
});

function MultisigSignerApprovedPage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MultisigSignerApprovedHeading />
        <MultisigSignerApprovedStats />
        <MultisigSignerApprovedTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigSignerApprovedPage;
