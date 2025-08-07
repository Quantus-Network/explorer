import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { BlockDetails } from '@/components/features/block-details';

export const Route = createFileRoute('/blocks/$id')({
  component: BlockDetailsPage
});

function BlockDetailsPage() {
  const { id } = Route.useParams();

  return <BlockDetails id={id} />;
}
