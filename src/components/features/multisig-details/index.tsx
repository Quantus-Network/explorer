import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

import { MultisigInformation } from './multisig-information/MultisigInformation';
import { MultisigDetailDataTabs } from './MultisigDetailDataTabs';

interface Props {
  id: string;
}

export const MultisigDetails: React.FC<Props> = ({ id }) => {
  const api = useApiClient();
  const query = api.multisigCreated.getById().useQuery(id);
  const { loading, data } = query;

  if (!loading && !data?.multisig) throw notFound();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-6">
        <h1 className="page-title">Multisig Wallet</h1>

        <MultisigInformation query={query} />
        <MultisigDetailDataTabs walletId={id} />
      </ContentContainer>
    </SectionContainer>
  );
};
