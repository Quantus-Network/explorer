import * as React from 'react';

import { AccountDetails } from '@/components/features/account-details';

export interface AccountDetailsProps {
  params: { id: string };
}

const AccountDetailsPage: React.FC<AccountDetailsProps> = ({ params }) => {
  return <AccountDetails id={params.id} />;
};

export default AccountDetailsPage;
