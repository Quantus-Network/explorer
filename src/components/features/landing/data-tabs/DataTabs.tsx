import React from 'react';

import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

import { RecentBlocks } from '../recent-blocks/RecentBlocks';

export interface DataTabsProps {}

export const DataTabs: React.FC<DataTabsProps> = () => {
  return (
    <SectionContainer>
      <ContentContainer>
        <RecentBlocks />
      </ContentContainer>
    </SectionContainer>
  );
};
