import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { ReversibleTransactionInformation } from '@/components/features/reversible-transaction-details/reversible-transaction-information/ReversibleTransactionInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/reversible-transactions/$hash')({
  component: ReversibleTransactionDetails
});

function ReversibleTransactionDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Reversible Transaction Details</h1>

        <ReversibleTransactionInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default ReversibleTransactionDetails;
