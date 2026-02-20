import type { QueryResult } from '@apollo/client';
import React from 'react';

import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import type { BlockResponse } from '@/schemas';

import { BlockAllTransactions } from '../block-all-transactions/BlockAllTransactions';

export interface BlockDataTabsProps {
  query: QueryResult<BlockResponse>;
}

export const BlockDataTabs: React.FC<BlockDataTabsProps> = ({ query }) => {
  return (
    <SectionContainer>
      <ContentContainer>
        <BlockAllTransactions query={query} />
      </ContentContainer>
    </SectionContainer>
  );
};
