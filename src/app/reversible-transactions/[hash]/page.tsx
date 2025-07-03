import { notFound } from 'next/navigation';
import * as React from 'react';

import api from '@/api';
import { ReversibleTransactionInformation } from '@/components/features/reversible-transaction-details/reversible-transaction-information/ReversibleTransactionInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

// This enables ISR
export const dynamicParams = true;

export interface ReversibleTransactionDetailsProps {
  params: { hash: string };
}

const ReversibleTransactionDetails: React.FC<
  ReversibleTransactionDetailsProps
> = async ({ params }) => {
  const { data } = await api.reversibleTransactions
    .getByHash()
    .query(params.hash);

  if (data?.reversibleTransactions.length !== 1) notFound();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Reversible Transaction Details</h1>

        <ReversibleTransactionInformation
          transaction={data.reversibleTransactions[0]}
        />
      </ContentContainer>
    </SectionContainer>
  );
};

export default ReversibleTransactionDetails;
