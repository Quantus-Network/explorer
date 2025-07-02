import * as React from 'react';

import { BlockDetails } from '@/components/features/block-details';

export interface BlockDetailsProps {
  params: { height: string };
}

const BlockDetailsPage: React.FC<BlockDetailsProps> = ({ params }) => {
  return <BlockDetails height={Number(params.height)} />;
};

export default BlockDetailsPage;
