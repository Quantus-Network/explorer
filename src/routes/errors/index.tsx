import { createFileRoute } from '@tanstack/react-router';

import { ErrorEventsHeading } from '@/components/features/error-events-listing/error-events-heading/ErrorEventsHeading';
import { ErrorEventsStats } from '@/components/features/error-events-listing/error-events-stats/ErrorEventsStats';
import { ErrorEventsTable } from '@/components/features/error-events-listing/error-events-table/ErrorEventsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/errors/')({
  component: ErrorEvents
});

function ErrorEvents() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <ErrorEventsHeading />

        <ErrorEventsStats />

        <ErrorEventsTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default ErrorEvents;
