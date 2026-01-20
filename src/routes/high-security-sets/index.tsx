import { createFileRoute } from '@tanstack/react-router';

import { HighSecuritySetsHeading } from '@/components/features/high-security-sets-listing/high-security-sets-heading/HighSecuritySetsHeading';
import { HighSecuritySetsStats } from '@/components/features/high-security-sets-listing/high-security-sets-stats/HighSecuritySetsStats';
import { HighSecuritySetsTable } from '@/components/features/high-security-sets-listing/high-security-sets-table/HighSecuritySetsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/high-security-sets/')({
  component: HighSecuritySets
});

function HighSecuritySets() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <HighSecuritySetsHeading />

        <HighSecuritySetsStats />

        <HighSecuritySetsTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default HighSecuritySets;
