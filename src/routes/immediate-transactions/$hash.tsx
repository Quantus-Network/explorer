import { createFileRoute, notFound } from '@tanstack/react-router';
import * as React from 'react';

import api from '@/api';
import { TransactionInformation } from '@/components/features/transaction-details/transaction-information/TransactionInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/immediate-transactions/$hash')({
  component: TransactionDetails
});
function TransactionDetails() {
  const { hash } = Route.useParams();
  const { data, loading, error } = api.transactions.getByHash().useQuery(hash);

  if (loading) return <div>Loading....</div>;

  if (!loading && (!data || data.transactions.length !== 1)) throw notFound();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Immediate Transaction Details</h1>

        <TransactionInformation transaction={data!.transactions[0]} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default TransactionDetails;
