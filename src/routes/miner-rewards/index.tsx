import { createFileRoute } from '@tanstack/react-router';

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
        <h1>Miner Rewards</h1>

        <MinerRewardsStats />
        <MinerRewardsTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MinerRewards;
