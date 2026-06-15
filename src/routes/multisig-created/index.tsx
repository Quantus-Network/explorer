import { createFileRoute } from '@tanstack/react-router';

import { MultisigCreatedHeading } from '@/components/features/multisig-created-listing/multisig-created-heading/MultisigCreatedHeading';
import { MultisigCreatedStats } from '@/components/features/multisig-created-listing/multisig-created-stats/MultisigCreatedStats';
import { MultisigCreatedTable } from '@/components/features/multisig-created-listing/multisig-created-table/MultisigCreatedTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/multisig-created/')({
  component: MultisigCreatedPage
});

function MultisigCreatedPage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MultisigCreatedHeading />
        <MultisigCreatedStats />
        <MultisigCreatedTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MultisigCreatedPage;
