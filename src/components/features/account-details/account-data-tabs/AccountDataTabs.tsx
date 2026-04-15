import type { QueryResult } from '@apollo/client';
import React from 'react';

import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import type { AccountResponse } from '@/schemas';

import { AccountAllTransactions } from '../account-all-transactions/AccountAllTransactions';

export interface AccountDataTabsProps {
  accountId: string;
  query: QueryResult<AccountResponse>;
}

export const AccountDataTabs: React.FC<AccountDataTabsProps> = ({
  query,
  accountId
}) => {
  return (
    <SectionContainer>
      <ContentContainer>
        <AccountAllTransactions accountId={accountId} query={query} />
      </ContentContainer>
    </SectionContainer>
  );
};
