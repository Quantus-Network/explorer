import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import api from '@/api';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

import { BlockDataTabs } from './block-data-tabs/BlockDataTabs';
import { BlockInformation } from './block-information/BlockInformation';

interface Props {
  id: string;
}

export const BlockDetails: React.FC<Props> = ({ id }) => {
  const query = api.blocks.getById().useQuery(id);
  const { loading, data } = query;

  if (!loading && !data?.blocks[0]) notFound();

  return (
    <>
      <SectionContainer>
        <ContentContainer className="flex flex-col gap-4">
          <h1>Block Details</h1>

          <BlockInformation query={query} />
        </ContentContainer>
      </SectionContainer>

      <BlockDataTabs query={query} />
    </>
  );
};
