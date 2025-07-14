import { usePathname } from 'next/navigation';
import * as React from 'react';

import { SearchPreview } from '@/components/features/landing/search-preview/SearchPreview';
import { SearchBox } from '@/components/ui/composites/search-box/SearchBox';
import { ThemeToggle } from '@/components/ui/composites/theme-toggle/ThemeToggle';
import { ContentContainer } from '@/components/ui/content-container';
import { cn } from '@/lib/utils';
import type { SearchAllResponse } from '@/schemas';

export interface TopbarProps {
  handleKeywordChange: (
    val: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  searchError?: string;
  searchLoading: boolean;
  searchResult?: SearchAllResponse;
}

export const Topbar: React.FC<TopbarProps> = ({
  handleKeywordChange,
  searchError,
  searchLoading,
  searchResult
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
          <div className="w-full md:max-w-xl">
            <SearchBox
              placeholder="Search transaction hash, account id, or block number/hash"
              onKeywordChange={handleKeywordChange}
              inputClassName="h-8"
              buttonClassName="size-7"
            />

            <SearchPreview
              searchResult={searchResult}
              isLoading={searchLoading}
              error={searchError}
            />
          </div>
        )}

        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </ContentContainer>
    </div>
  );
};
