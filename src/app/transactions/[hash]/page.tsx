import { notFound } from 'next/navigation';
import * as React from 'react';

import api from '@/api';
import { TransactionInformation } from '@/components/features/transaction-details/transaction-information/TransactionInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

// This enables ISR
export const dynamicParams = true;

export interface TransactionDetailsProps {
  params: { hash: string };
}

const TransactionDetails: React.FC<TransactionDetailsProps> = async ({
  params
}) => {
  const { data } = await api.transactions.getByHash().query(params.hash);

  if (data?.transactions.length !== 1) notFound();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Transaction Details</h1>

        <TransactionInformation transaction={data.transactions[0]} />
      </ContentContainer>
    </SectionContainer>
  );
};

export default TransactionDetails;
