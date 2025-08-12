import { createFileRoute } from '@tanstack/react-router';

import { MinerRewardsHeading } from '@/components/features/miner-reward-listing/miner-rewards-heading/MinerRewardsHeading';
import { MinerRewardsStats } from '@/components/features/miner-reward-listing/miner-rewards-stats/MinerRewardsStats';
import { MinerRewardsTable } from '@/components/features/miner-reward-listing/miner-rewards-table/MinerRewardsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/miner-rewards/')({
  component: MinerRewards
});

function MinerRewards() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <MinerRewardsHeading />
        <MinerRewardsStats />
        <MinerRewardsTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MinerRewards;
