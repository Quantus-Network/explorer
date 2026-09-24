import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { isUnknownAccountNotFound } from '@/utils/is-unknown-account-not-found';

import { AccountAllTransactions } from './account-all-transactions/AccountAllTransactions';
import { AccountInformation } from './account-information/AccountInformation';

interface Props {
  id: string;
}

export const AccountDetails: React.FC<Props> = ({ id }) => {
  const api = useApiClient();
  const query = api.accounts.getById().useQuery(id);
  const { loading, data } = query;

  if (
    isUnknownAccountNotFound({
      loading,
      account: data?.account,
      accountId: id
    })
  ) {
    throw notFound();
  }

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-6">
        <h1 className="page-title">Account</h1>

        <AccountInformation accountId={id} query={query} />

        <AccountAllTransactions accountId={id} />
      </ContentContainer>
    </SectionContainer>
  );
};
