'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { RESOURCES } from '@/constants/resources';

import { BlocksTable } from '../block-tables/BlocksTable';

export const RecentBlocks = () => {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h2>Recent Blocks</h2>

        <BlocksTable />

        <Button variant="link" className="mx-auto w-fit">
          <Link href={RESOURCES.blocks}>See all blocks</Link>
        </Button>
      </ContentContainer>
    </SectionContainer>
  );
};
