import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';

import { MinerRewardsTable } from '../miner-rewards-table/MinerRewardsTable';

export const RecentMinerRewards = () => {
  return (
    <ContentContainer className="flex flex-col gap-4 px-0">
      <h2>Recent Miner Rewards</h2>

      <MinerRewardsTable />

      <Button variant="link" className="mx-auto w-fit">
        <Link to={RESOURCES.minerRewards}>See all miner rewards</Link>
      </Button>
    </ContentContainer>
  );
};
