import { createFileRoute } from '@tanstack/react-router';

import { DepositPoolStatsCard } from '@/components/features/wormhole/DepositPoolStats';
import { WormholeOutputsTable } from '@/components/features/wormhole/WormholeOutputsTable';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/wormhole/')({
  component: WormholePage
});

function WormholePage() {
  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <div>
          <h1>Wormhole</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Privacy-preserving transfers via zero-knowledge proofs. Each output
            is scored based on how many deposit combinations could have produced
            it.
          </p>
        </div>
        <DepositPoolStatsCard />
        <WormholeOutputsTable />
      </ContentContainer>
    </SectionContainer>
  );
}

export default WormholePage;
