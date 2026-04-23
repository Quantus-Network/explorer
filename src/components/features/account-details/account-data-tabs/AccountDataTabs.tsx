import type { QueryResult } from '@apollo/client';
import React from 'react';

import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import type { AccountResponse } from '@/schemas';

import { AccountAllTransactions } from '../account-all-transactions/AccountAllTransactions';

export interface AccountDataTabsProps {
  query: QueryResult<AccountResponse>;
}

export const AccountDataTabs: React.FC<AccountDataTabsProps> = ({ query }) => {
  return (
    <SectionContainer>
      <ContentContainer>
        <AccountAllTransactions query={query} />
      </ContentContainer>
    </SectionContainer>
  );
};
