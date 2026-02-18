import { createFileRoute } from '@tanstack/react-router';

import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { DepositPoolStatsCard } from '@/components/features/wormhole/DepositPoolStats';
import { WormholeOutputsTable } from '@/components/features/wormhole/WormholeOutputsTable';

export const Route = createFileRoute('/wormhole/')({
  component: WormholePage
});

function WormholePage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold">Wormhole</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Privacy-preserving transfers via zero-knowledge proofs. Each output
            is scored based on how many deposit combinations could have produced
            it.
          </p>
        </div>
        <DepositPoolStatsCard />
        <h2 className="text-lg font-semibold">Recent Outputs</h2>
        <WormholeOutputsTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default WormholePage;
