'use client';

import { SearchBox } from '@/components/ui/composites/search-box/SearchBox';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

import { ChainStats } from './chain-stats/ChainStats';
import { useHero } from './hook';

export interface HeroProps {}

export const Hero = (props: HeroProps) => {
  const { handleSearch, handleKeywordChange } = useHero();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-8">
          <h1>Explore the Quantus Blockchain Network</h1>

          <p className="mx-auto max-w-xl text-center text-3xl text-secondary-foreground">
            Discover, analyze, and track transactions across the blockchain
            network in real-time
          </p>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <SearchBox
            onSearch={handleSearch}
            onKeywordChange={handleKeywordChange}
          />
        </div>

        <ChainStats />
      </ContentContainer>
    </SectionContainer>
  );
};
