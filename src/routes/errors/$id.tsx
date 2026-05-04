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
        <div>
          <h1>Error Event</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Detailed information about a specific error event.
          </p>
        </div>

        <ErrorEventInformation id={id} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default ErrorEventDetails;
