import { createFileRoute, notFound } from '@tanstack/react-router';
import * as React from 'react';

import api from '@/api';
import { ReversibleTransactionInformation } from '@/components/features/reversible-transaction-details/reversible-transaction-information/ReversibleTransactionInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/reversible-transactions/$hash')({
  component: ReversibleTransactionDetails
});

function ReversibleTransactionDetails() {
  const { hash } = Route.useParams();
  const { data, loading, error } = api.reversibleTransactions
    .getByHash()
    .useQuery(hash);

  if (loading) return <div>Loading....</div>;

  if (!loading && (!data || data.reversibleTransactions.length !== 1))
    throw notFound();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Reversible Transaction Details</h1>

        <ReversibleTransactionInformation
          transaction={data!.reversibleTransactions[0]}
        />
      </ContentContainer>
    </SectionContainer>
  );
}

export default ReversibleTransactionDetails;
