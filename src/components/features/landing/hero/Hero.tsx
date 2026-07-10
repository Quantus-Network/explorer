import { SearchBox } from '@/components/ui/composites/search-box/SearchBox';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';

import { SearchPreview } from '../../../ui/composites/search-preview/SearchPreview';
import { ChainStats } from './chain-stats/ChainStats';
import { useHero } from './hook';

export const Hero = () => {
  const {
    handleKeywordChange,
    handleInputFocus,
    handleKeyDown,
    isResultVisible,
    resultRef,
    inputRef,
    searchError,
    searchLoading,
    searchResult,
    handleClosePreview
  } = useHero();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-7">
        <div className="relative w-full">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-text">
            Search the chain
          </div>

          <SearchBox
            ref={inputRef}
            size="md"
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder="Search by hash, address, block height, or transaction ID…"
            onKeywordChange={handleKeywordChange}
          />

          {isResultVisible && (
            <SearchPreview
              ref={resultRef}
              handleClosePreview={handleClosePreview}
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
