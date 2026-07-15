import { createFileRoute } from '@tanstack/react-router';

import { BlocksHeading } from '@/components/features/block-listing/blocks-heading/BlocksHeading';
import { BlocksStats } from '@/components/features/block-listing/blocks-stats/BlocksStats';
import { BlocksTable } from '@/components/features/block-listing/blocks-table/BlocksTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/blocks/')({
  component: Blocks
});

function Blocks() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <BlocksHeading />

        <BlocksStats />

        <BlocksTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default Blocks;
