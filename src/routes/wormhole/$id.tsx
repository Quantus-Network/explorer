import { createFileRoute } from '@tanstack/react-router';

import { WormholeOutputInformation } from '@/components/features/wormhole/WormholeOutputDetails';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

export const Route = createFileRoute('/wormhole/$id')({
  component: WormholeOutputDetailsPage
});

function WormholeOutputDetailsPage() {
  const { id } = Route.useParams();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Wormhole Output</h1>
        <WormholeOutputInformation id={id} />
      </ContentContainer>
    </SectionContainer>
  );
}

export default WormholeOutputDetailsPage;
