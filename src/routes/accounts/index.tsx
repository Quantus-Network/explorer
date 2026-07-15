import { createFileRoute } from '@tanstack/react-router';

import { AccountsHeading } from '@/components/features/account-listing/accounts-heading/AccountsHeading';
import { AccountsStats } from '@/components/features/account-listing/accounts-stats/AccountsStats';
import { AccountsTable } from '@/components/features/account-listing/accounts-table/AccountsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/accounts/')({
  component: Accounts
});

function Accounts() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <AccountsHeading />

        <AccountsStats />
        <AccountsTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default Accounts;
