import { Link } from '@tanstack/react-router';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { RESOURCES } from '@/constants/resources';
import type { SearchAllResponse } from '@/schemas/searchs';

import { Card, CardContent } from '../../card';

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
      className="block rounded px-2 py-1 text-sm hover:bg-accent focus:bg-accent focus:outline-none"
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
  items?: T[];
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
    <div>
      <div className="px-2 py-1 text-lg font-semibold text-muted-foreground">
        {title}
      </div>

      {loading && <Skeleton className="mb-2 h-8 w-full" />}

      {error && (
        <div className="px-2 py-1 text-sm text-destructive">
          Error loading {title.toLowerCase()}.
        </div>
      )}

      {isEmpty && (
        <div className="px-2 py-1 text-sm text-muted-foreground">
          {emptyMsg}
        </div>
      )}

      {isSuccess && (
        <ul className="flex flex-col gap-1" role="group">
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
}

export const SearchPreview = forwardRef<HTMLDivElement, SearchPreviewProps>(
  ({ isLoading, error, searchResult, onKeyDown }, ref) => {
    const {
      accounts,
      transactions,
      blocks,
      reversibleTransactions,
      minerRewards,
      highSecuritySets,
      errorEvents
    } = searchResult || {};

    if (
      !isLoading &&
      !transactions &&
      !blocks &&
      !minerRewards &&
      !accounts &&
      !reversibleTransactions &&
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
        renderItem: (tx: any) => (
          <PreviewLink
            href={`${RESOURCES.transactions}/${tx.extrinsicHash}`}
            label={`${tx.extrinsicHash}`}
          />
        )
      },
      {
        title: 'Reversible Transactions',
        emptyMsg: 'No reversible transactions found.',
        items: reversibleTransactions,
        renderItem: (tx: any) => (
          <PreviewLink
            href={`${RESOURCES.reversibleTransactions}/${tx.extrinsicHash}`}
            label={`${tx.extrinsicHash}`}
          />
        )
      },
      {
        title: 'Accounts',
        emptyMsg: 'No accounts found.',
        items: accounts,
        renderItem: (acc: any) => (
          <PreviewLink
            href={`${RESOURCES.accounts}/${acc.id}`}
            label={`${acc.id}`}
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
            label={`${block.height}`}
          />
        )
      },
      {
        title: 'Miner Rewards',
        emptyMsg: 'No miner rewards found.',
        items: minerRewards,
        renderItem: (minerReward: any) => (
          <PreviewLink
            href={`${RESOURCES.minerRewards}/${minerReward.block.hash}`}
            label={`${minerReward.block.hash}`}
          />
        )
      },
      {
        title: 'High Security Sets',
        emptyMsg: 'No high security sets found.',
        items: highSecuritySets,
        renderItem: (highSecuritySet: any) => (
          <PreviewLink
            href={`${RESOURCES.highSecuritySets}/${highSecuritySet.extrinsicHash}`}
            label={`${highSecuritySet.extrinsicHash}`}
          />
        )
      },
      {
        title: 'Error Events',
        emptyMsg: 'No error events found.',
        items: errorEvents,
        renderItem: (errorEvent: any) => (
          <PreviewLink
            href={`${RESOURCES.errors}/${errorEvent.extrinsicHash}`}
            label={`${errorEvent.extrinsicHash}`}
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
        className="absolute left-0 z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-lg focus:outline-none"
        role="listbox"
        aria-label="Search suggestions"
        tabIndex={-1}
      >
        <Card className="border-none shadow-none">
          <CardContent className="flex flex-col gap-2 p-2">
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
          </CardContent>
        </Card>
      </div>
    );
  }
);

SearchPreview.displayName = 'SearchPreview';
