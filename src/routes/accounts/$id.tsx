import { createFileRoute } from '@tanstack/react-router';

import { AccountDetails } from '@/components/features/account-details';

export const Route = createFileRoute('/accounts/$id')({
  component: AccountDetailsPage
});

function AccountDetailsPage() {
  const { id } = Route.useParams();

  return <AccountDetails id={id} />;
}

export default AccountDetailsPage;
