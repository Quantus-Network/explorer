import { AccountsTable } from '@/components/features/account-listing/accounts-table/AccountsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

const Accounts = () => {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Accounts</h1>

        <AccountsTable />
      </ContentContainer>
    </SectionContainer>
  );
};

export default Accounts;
