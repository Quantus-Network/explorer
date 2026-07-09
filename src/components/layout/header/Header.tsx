import { Link, useLocation } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { NetworkSelect } from '@/components/ui/composites/network-select/NetworkSelect';
import { SearchBox } from '@/components/ui/composites/search-box/SearchBox';
import { SearchPreview } from '@/components/ui/composites/search-preview/SearchPreview';
import env from '@/config/env';
import { cn } from '@/lib/utils';

import { DesktopMenu } from './DesktopMenu';
import { useHeader } from './hook';
import { MobileMenu } from './MobileMenu';

export interface HeaderProps {}

const SEARCH_PLACEHOLDER = 'Search by hash, address, block height…';
const MD_BREAKPOINT = '(min-width: 768px)';

export const Header = (_props: HeaderProps) => {
  const {
    isOpen,
    toggleMenu,
    handleKeywordChange,
    handleInputFocus,
    handleKeyDown,
    handleClosePreview,
    searchError,
    searchLoading,
    searchResult,
    isResultVisible,
    inputRef,
    resultRef
  } = useHeader();

  const location = useLocation().pathname;
  const rootPath = location.split('/')[1];
  const isHomepage = rootPath === '';
  const isDesktop = useMediaQuery(MD_BREAKPOINT, {
    defaultValue: false,
    initializeWithValue: false
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const searchPreview = isResultVisible ? (
    <SearchPreview
      ref={resultRef}
      onKeyDown={handleKeyDown}
      searchResult={searchResult}
      isLoading={searchLoading}
      error={searchError}
      handleClosePreview={handleClosePreview}
    />
  ) : null;

  return (
    <div className="sticky top-0 z-[100] flex flex-col">
      <header className="flex h-nav w-full items-center border-b border-border-subtle bg-void px-3.5 md:px-6">
        <Link
          to="/"
          className="mr-4 flex shrink-0 items-center gap-2 no-underline md:mr-8"
        >
          <img
            src="/images/logomark.webp"
            alt="Quantus Logo"
            className="size-[18px]"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
          <span className="text-sm font-medium tracking-[-0.01em] text-content">
            {env.SITE_NAME}
          </span>
        </Link>

        <DesktopMenu />

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {!isHomepage && isDesktop && (
            <div className="relative w-[260px]">
              <SearchBox
                ref={inputRef}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                placeholder={SEARCH_PLACEHOLDER}
                onKeywordChange={handleKeywordChange}
                buttonVariant="ghost"
                inputClassName={cn(
                  'h-8 rounded-none border-border-strong bg-surface pe-10 font-mono text-xs shadow-none',
                  'placeholder:text-muted-text-2 focus-visible:border-flare focus-visible:ring-0'
                )}
                buttonClassName="right-0 top-0 size-8 translate-y-0 rounded-none border-0 border-l border-border-strong bg-transparent shadow-none hover:bg-transparent hover:text-content"
              />
              {searchPreview}
            </div>
          )}

          <NetworkSelect />

          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="flex size-9 items-center justify-center text-content md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="size-[18px]" />
            ) : (
              <Menu className="size-[18px]" />
            )}
          </button>
        </div>
      </header>

      {!isHomepage && !isDesktop && (
        <div className="border-b border-border-subtle bg-surface px-3.5 py-2.5">
          <div className="relative w-full">
            <SearchBox
              ref={inputRef}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              placeholder={SEARCH_PLACEHOLDER}
              onKeywordChange={handleKeywordChange}
              buttonVariant="ghost"
              inputClassName={cn(
                'h-9 rounded-none border-border-strong bg-void pe-10 font-mono text-xs shadow-none',
                'placeholder:text-muted-text-2 focus-visible:border-flare focus-visible:ring-0'
              )}
              buttonClassName="right-0 top-0 size-9 translate-y-0 rounded-none border-0 border-l border-border-strong bg-void shadow-none hover:bg-transparent hover:text-content"
            />
            {searchPreview}
          </div>
        </div>
      )}

      <MobileMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};
