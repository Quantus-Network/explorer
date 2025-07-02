import { Suspense } from 'react';

import { BlocksStats } from '@/components/features/block-listing/blocks-stats/BlocksStats';
import { BlocksTable } from '@/components/features/block-listing/blocks-table/BlocksTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

const Blocks = () => {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Blocks</h1>

        <BlocksStats />

        <Suspense>
          <BlocksTable />
        </Suspense>
      </ContentContainer>
    </SectionContainer>
  );
};

export default Blocks;
