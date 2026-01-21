import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';

import { ErrorEventsTable } from '../error-events-table/ErrorEventsTable';

export const RecentErrorEvents = () => {
  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Error Events</h2>

      <ErrorEventsTable />

      <Button variant="link" className="mx-auto w-fit">
        <Link to={RESOURCES.errors}>See all error events</Link>
      </Button>
    </ContentContainer>
  );
};
