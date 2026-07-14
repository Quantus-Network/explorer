import { createFileRoute } from '@tanstack/react-router';

import { MultisigDetails } from '@/components/features/multisig-details';
import { parseMultisigDetailSearch } from '@/constants/multisig-detail';

export const Route = createFileRoute('/multisig/$id')({
  validateSearch: parseMultisigDetailSearch,
  component: MultisigDetailsPage
});

function MultisigDetailsPage() {
  const { id } = Route.useParams();

  return <MultisigDetails id={id} />;
}

export default MultisigDetailsPage;
