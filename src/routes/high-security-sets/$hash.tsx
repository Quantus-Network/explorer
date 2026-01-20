import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { HighSecuritySetInformation } from '@/components/features/high-security-set-details/high-security-set-information/HighSecuritySetInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/high-security-sets/$hash')({
  component: HighSecuritySetDetails
});
function HighSecuritySetDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>High Security Set Details</h1>

        <HighSecuritySetInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default HighSecuritySetDetails;
