import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { ExecutedReversibleTransactionInformation } from '@/components/features/executed-reversible-transaction-details/executed-reversible-transaction-information/ExecutedReversibleTransactionInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/executed-reversible-transactions/$txId')(
  {
    component: ExecutedReversibleTransactionDetails
  }
);

function ExecutedReversibleTransactionDetails() {
  const { txId } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Executed Reversible Transaction Details</h1>

        <ExecutedReversibleTransactionInformation txId={txId} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default ExecutedReversibleTransactionDetails;
