import { createFileRoute } from '@tanstack/react-router';

import { MinerLeaderboardChart } from '@/components/features/miner-leaderboard/miner-leaderboard-chart/MinerLeaderboardChart';
import { MinerLeaderboardStats } from '@/components/features/miner-leaderboard/miner-leaderboard-stats/MinerLeaderboardStats';
import { MinerLeaderboardTable } from '@/components/features/miner-leaderboard/miner-leaderboard-table/MinerLeaderboardTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/miner-leaderboard/')({
  component: MinerLeaderboard
});

function MinerLeaderboard() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1 className="page-title">Miner Leaderboard</h1>

        <MinerLeaderboardStats />

        <MinerLeaderboardChart />

        <MinerLeaderboardTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default MinerLeaderboard;
