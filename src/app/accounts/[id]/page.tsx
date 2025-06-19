import { notFound } from 'next/navigation';
import * as React from 'react';

import api from '@/api';
import { AccountInformation } from '@/components/features/account-details/account-information/AccountInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

// This enables ISR
export const dynamicParams = true;

export interface AccountDetailsProps {
  params: { id: string };
}

const AccountDetails: React.FC<AccountDetailsProps> = async ({ params }) => {
  const { data } = await api.accounts.getById().query(params.id);

  if (!data?.account) notFound();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Account Details</h1>

        <AccountInformation account={data.account} />
      </ContentContainer>
    </SectionContainer>
  );
};

export default AccountDetails;
