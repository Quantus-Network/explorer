import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { validateAccountId } from '@/utils/validate-account-id';

import { AccountDataTabs } from './account-data-tabs/AccountDataTabs';
import { AccountInformation } from './account-information/AccountInformation';

interface Props {
  id: string;
}

export const AccountDetails: React.FC<Props> = ({ id }) => {
  const api = useApiClient();
  const isAccountValid = validateAccountId(id);
  const query = api.accounts.getById().useQuery(id);
  const { loading, data } = query;

  if (!loading && !data?.account && !isAccountValid) throw notFound();

  return (
    <>
      <SectionContainer>
        <ContentContainer className="flex flex-col gap-4">
          <h1>Account Details</h1>

          <AccountInformation accountId={id} query={query} />
        </ContentContainer>
      </SectionContainer>

      <AccountDataTabs accountId={id} query={query} />
    </>
  );
};
