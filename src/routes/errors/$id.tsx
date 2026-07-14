import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { ErrorEventInformation } from '@/components/features/error-event-details/error-event-information/ErrorEventInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/errors/$id')({
  component: ErrorEventDetails
});

function ErrorEventDetails() {
  const { id } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1 className="page-title">Error Event</h1>

        <ErrorEventInformation id={id} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default ErrorEventDetails;
