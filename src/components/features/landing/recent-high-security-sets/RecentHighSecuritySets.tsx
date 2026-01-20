import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';

import { HighSecuritySetsTable } from '../high-security-sets-table/HighSecuritySetsTable';

export const RecentHighSecuritySets = () => {
  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent High Security Sets</h2>

      <HighSecuritySetsTable />

      <Button variant="link" className="mx-auto w-fit">
        <Link to={RESOURCES.highSecuritySets}>See all high security sets</Link>
      </Button>
    </ContentContainer>
  );
};
