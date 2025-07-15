'use client';

import { SearchBox } from '@/components/ui/composites/search-box/SearchBox';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

import { SearchPreview } from '../../../ui/composites/search-preview/SearchPreview';
import { ChainStats } from './chain-stats/ChainStats';
import { useHero } from './hook';

export interface HeroProps {}

export const Hero = (props: HeroProps) => {
  const {
    handleKeywordChange,
    handleInputFocus,
    handleKeyDown,
    isResultVisible,
    resultRef,
    inputRef,
    searchError,
    searchLoading,
    searchResult
  } = useHero();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-center">
            Explore the Quantus Blockchain Network
          </h1>

          <p className="mx-auto max-w-xl text-center text-3xl text-secondary-foreground">
            Discover, analyze, and track transactions across the blockchain
            network in real-time
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-3xl">
          <SearchBox
            ref={inputRef}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder="Search transaction hash, account id, or block number/hash"
            onKeywordChange={handleKeywordChange}
          />

          {isResultVisible && (
            <SearchPreview
              ref={resultRef}
              onKeyDown={handleKeyDown}
              searchResult={searchResult}
              isLoading={searchLoading}
              error={searchError}
            />
          )}
        </div>

        <ChainStats />
      </ContentContainer>
    </SectionContainer>
  );
};
