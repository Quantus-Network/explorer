import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { formatBlockHeight } from '@/utils/formatter';

import { BlockAllTransactions } from './block-all-transactions/BlockAllTransactions';
import { BlockInformation } from './block-information/BlockInformation';

interface Props {
  id: string;
}

export const BlockDetails: React.FC<Props> = ({ id }) => {
  const api = useApiClient();
  const query = api.blocks.getById().useQuery(id);
  const { loading, data } = query;

  if (!loading && !data?.blocks[0]) notFound();

  const height = data?.blocks[0]?.height;
  const title =
    height != null ? `Block #${formatBlockHeight(height)}` : 'Block Details';

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-6">
        <h1 className="page-title">{title}</h1>

        <BlockInformation query={query} />

        <BlockAllTransactions query={query} />
      </ContentContainer>
    </SectionContainer>
  );
};
