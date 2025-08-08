import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';

import { MinerRewardInformation } from '@/components/features/miner-reward-details/miner-reward-information/MinerRewardInformation';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/miner-rewards/$hash')({
  component: MinerRewardDetails
});

function MinerRewardDetails() {
  const { hash } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Miner Reward Details</h1>

        <MinerRewardInformation hash={hash} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MinerRewardDetails;
