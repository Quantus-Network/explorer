import React from 'react';

import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

import { RecentBlocks } from '../recent-blocks/RecentBlocks';
import { RecentTransactions } from '../recent-transactions/RecentTransactions';

export interface DataTabsProps {}

export const DataTabs: React.FC<DataTabsProps> = () => {
  return (
    <SectionContainer>
      <ContentContainer className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <RecentBlocks />
        <RecentTransactions />
      </ContentContainer>
    </SectionContainer>
  );
};
