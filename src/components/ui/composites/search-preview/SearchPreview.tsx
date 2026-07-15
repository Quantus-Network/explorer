import { Link } from '@tanstack/react-router';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import { InlineFetchError } from '@/components/ui/composites/fetch-error/FetchError';
import { Skeleton } from '@/components/ui/skeleton';
import { RESOURCES } from '@/constants/resources';
import type { SearchAllResponse } from '@/schemas/searchs';
import { formatBlockHeight } from '@/utils/formatter';
import { getUnifiedTransactionDetailPath } from '@/utils/get-unified-transaction-detail-path';

// Helper: Preview link
function PreviewLink({
  href,
  label,
  onSelect
}: {
  href: string;
  label: string;
  onSelect?: () => void;
}) {
  return (
    <Link
      to={href}
      className="block px-3.5 py-2 text-sm text-muted-text no-underline transition-colors hover:bg-surface-2 hover:text-content focus:bg-surface-2 focus:text-content focus:outline-none"
      tabIndex={0}
      role="option"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect?.();
        }
      }}
    >
      {label}
    </Link>
  );
}

interface SectionProps<T> {
  title: string;
  loading: boolean;
  error?: string;
  emptyMsg: string;
  items?: any[];
  renderItem: (item: T) => React.ReactNode;
}

// Helper: Section for each resource
const Section = <T,>({
  title,
  loading,
  error,
  emptyMsg,
  items,
  renderItem
}: SectionProps<T>) => {
  const isEmpty = !loading && !error && items && items.length === 0;
  const isSuccess = !loading && !error && items && items.length > 0;

  return (
    <div className="border-b border-border-subtle last:border-b-0">
      <div className="px-3.5 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-text">
        {title}
      </div>

      {loading && (
        <Skeleton className="mx-3.5 mb-3 h-8 w-[calc(100%-1.75rem)]" />
      )}

      {error && (
        <div className="px-3.5 py-2">
          <InlineFetchError>
            Error loading {title.toLowerCase()}.
          </InlineFetchError>
        </div>
      )}

      {isEmpty && (
        <div className="px-3.5 py-2 text-sm text-muted-text">{emptyMsg}</div>
      )}

      {isSuccess && (
        <ul className="flex flex-col" role="group">
          {items.map((item: any, idx: number) => (
            <li key={idx} className="break-words">
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface SearchPreviewProps
  extends Pick<HTMLAttributes<HTMLInputElement>, 'onKeyDown'> {
  searchResult?: SearchAllResponse;
  isLoading: boolean;
  error?: string;
  handleClosePreview: () => void;
}

export const SearchPreview = forwardRef<HTMLDivElement, SearchPreviewProps>(
  ({ isLoading, error, searchResult, onKeyDown, handleClosePreview }, ref) => {
    const { accounts, transactions, blocks, highSecuritySets, errorEvents } =
      searchResult || {};

    if (
      !isLoading &&
      !transactions &&
      !blocks &&
      !accounts &&
      !highSecuritySets &&
      !errorEvents
    ) {
      return null;
    }

    // Define all sections with their configuration
    const sections = [
      {
        title: 'Transactions',
        emptyMsg: 'No transactions found.',
        items: transactions,
        renderItem: (tx: SearchAllResponse['transactions'][number]) => {
          const href = getUnifiedTransactionDetailPath({
            type: tx.type,
            hash: tx.hash,
            detailId: tx.detail_id,
            block: tx.block
          });
          const label = tx.hash ?? tx.detail_id ?? tx.id;

          return (
            <PreviewLink
              href={href}
              label={label}
              onSelect={handleClosePreview}
            />
          );
        }
      },
      {
        title: 'Accounts',
        emptyMsg: 'No accounts found.',
        items: accounts,
        renderItem: (acc: any) => (
          <PreviewLink
            href={`${RESOURCES.accounts}/${acc.id}`}
            label={`${acc.id}`}
            onSelect={handleClosePreview}
          />
        )
      },
      {
        title: 'Blocks',
        emptyMsg: 'No blocks found.',
        items: blocks,
        renderItem: (block: any) => (
          <PreviewLink
            href={`${RESOURCES.blocks}/${block.height}`}
            label={formatBlockHeight(block.height)}
            onSelect={handleClosePreview}
          />
        )
      },
      {
        title: 'High Security Sets',
        emptyMsg: 'No high security sets found.',
        items: highSecuritySets,
        renderItem: (highSecuritySet: any) => (
          <PreviewLink
            href={`${RESOURCES.highSecuritySets}/${highSecuritySet.extrinsic?.id}`}
            label={`${highSecuritySet.extrinsic?.id}`}
            onSelect={handleClosePreview}
          />
        )
      },
      {
        title: 'Error Events',
        emptyMsg: 'No error events found.',
        items: errorEvents,
        renderItem: (errorEvent: any) => (
          <PreviewLink
            href={`${RESOURCES.errors}/${errorEvent.extrinsic?.id}`}
            label={`${errorEvent.extrinsic?.id}`}
            onSelect={handleClosePreview}
          />
        )
      }
    ];

    // Sort sections: resources with results first, then resources with no results
    const sortedSections = [...sections].sort((a, b) => {
      const aHasResults = a.items && a.items.length > 0;
      const bHasResults = b.items && b.items.length > 0;

      // If both have results or both don't have results, maintain original order
      if (aHasResults === bHasResults) {
        return 0;
      }

      // If a has results and b doesn't, a comes first
      if (aHasResults && !bHasResults) {
        return -1;
      }

      // If b has results and a doesn't, b comes first
      return 1;
    });

    // Accessibility: aria attributes
    return (
      <div
        ref={ref}
        onKeyDown={onKeyDown}
        className="absolute left-0 z-50 mt-1 w-full rounded-none border border-border-strong bg-surface text-content shadow-[0_8px_32px_rgba(0,0,0,0.4)] focus:outline-none"
        role="listbox"
        aria-label="Search suggestions"
        tabIndex={-1}
      >
        <div className="flex max-h-[min(70vh,28rem)] flex-col overflow-y-auto">
          {sortedSections.map((section) => (
            <Section
              key={section.title}
              title={section.title}
              loading={isLoading}
              error={error}
              emptyMsg={section.emptyMsg}
              items={section.items}
              renderItem={section.renderItem}
            />
          ))}
        </div>
      </div>
    );
  }
);

SearchPreview.displayName = 'SearchPreview';
