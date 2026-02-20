import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { TransactionInformation } from '@/components/features/transaction-details/transaction-information/TransactionInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/immediate-transactions/$hash')({
  component: TransactionDetails
});
function TransactionDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Extrinsic Details</h1>

        <TransactionInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default TransactionDetails;
