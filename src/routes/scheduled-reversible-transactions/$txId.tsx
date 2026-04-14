import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { ScheduledReversibleTransactionInformation } from '@/components/features/scheduled-reversible-transaction-details/scheduled-reversible-transaction-information/ScheduledReversibleTransactionInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute(
  '/scheduled-reversible-transactions/$txId'
)({
  component: ScheduledReversibleTransactionDetails
});

function ScheduledReversibleTransactionDetails() {
  const { txId } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Scheduled Reversible Transaction Details</h1>

        <ScheduledReversibleTransactionInformation txId={txId} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default ScheduledReversibleTransactionDetails;
