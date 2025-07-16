import * as React from 'react';

import { BlockDetails } from '@/components/features/block-details';

export interface BlockDetailsProps {
  /** @description The ID of the block can be height or hash. */
  params: { id: string };
}

const BlockDetailsPage: React.FC<BlockDetailsProps> = ({ params }) => {
  return <BlockDetails id={params.id} />;
};

export default BlockDetailsPage;
