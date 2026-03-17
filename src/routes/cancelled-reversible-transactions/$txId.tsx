import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { CancelledReversibleTransactionInformation } from '@/components/features/cancelled-reversible-transaction-details/cancelled-reversible-transaction-information/CancelledReversibleTransactionInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute(
  '/cancelled-reversible-transactions/$txId'
)({
  component: CancelledReversibleTransactionDetails
});

function CancelledReversibleTransactionDetails() {
  const { txId } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Cancelled Reversible Transaction Details</h1>

        <CancelledReversibleTransactionInformation txId={txId} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default CancelledReversibleTransactionDetails;
