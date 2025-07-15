import { usePathname } from 'next/navigation';
import * as React from 'react';

import { SearchBox } from '@/components/ui/composites/search-box/SearchBox';
import { SearchPreview } from '@/components/ui/composites/search-preview/SearchPreview';
import { ThemeToggle } from '@/components/ui/composites/theme-toggle/ThemeToggle';
import { ContentContainer } from '@/components/ui/content-container';
import { cn } from '@/lib/utils';
import type { SearchAllResponse } from '@/schemas';

export interface TopbarProps {
  handleKeywordChange: (
    val: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleInputFocus: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  searchError?: string;
  searchLoading: boolean;
  searchResult?: SearchAllResponse;
  isResultVisible: boolean;
  inputRef: React.RefObject<HTMLDivElement>;
  resultRef: React.RefObject<HTMLDivElement>;
}

export const Topbar: React.FC<TopbarProps> = ({
  handleKeywordChange,
  handleInputFocus,
  handleKeyDown,

  searchError,
  searchLoading,
  searchResult,
  isResultVisible,

  inputRef,
  resultRef
}) => {
  const location = usePathname();
  const rootPath = location.split('/')[1];
  const isHomepage = rootPath === '';

  return (
    <div
      className={cn(
        'bg-topbar border-b border-solid py-2',
        isHomepage && 'hidden md:block'
      )}
    >
      <ContentContainer className="flex items-center justify-end gap-6">
        {/* Hide search box topbar when in homepage, because already has it. */}
        {!isHomepage && (
          <div className="relative w-full md:max-w-xl">
            <SearchBox
              ref={inputRef}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              placeholder="Search transaction hash, account id, or block number/hash"
              onKeywordChange={handleKeywordChange}
              inputClassName="h-8"
              buttonClassName="size-7"
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
        )}

        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </ContentContainer>
    </div>
  );
};
