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
      highSecuritySets
    } = searchResult || {};

    if (
      !isLoading &&
      !transactions &&
      !blocks &&
      !minerRewards &&
      !accounts &&
      !reversibleTransactions &&
      !highSecuritySets
    ) {
      return null;
    }

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
            {/* Transactions */}
            <Section
              title="Transactions"
              loading={isLoading}
              error={error}
              emptyMsg="No transactions found."
              items={transactions}
              renderItem={(tx) => (
                <PreviewLink
                  href={`${RESOURCES.transactions}/${tx.extrinsicHash}`}
                  label={`${tx.extrinsicHash}`}
                />
              )}
            />

            {/* Reversible Transactions */}
            <Section
              title="Reversible Transactions"
              loading={isLoading}
              error={error}
              emptyMsg="No reversible transactions found."
              items={reversibleTransactions}
              renderItem={(tx) => (
                <PreviewLink
                  href={`${RESOURCES.reversibleTransactions}/${tx.extrinsicHash}`}
                  label={`${tx.extrinsicHash}`}
                />
              )}
            />

            {/* Accounts */}
            <Section
              title="Accounts"
              loading={isLoading}
              error={error}
              emptyMsg="No accounts found."
              items={accounts}
              renderItem={(acc) => (
                <PreviewLink
                  href={`${RESOURCES.accounts}/${acc.id}`}
                  label={`${acc.id}`}
                />
              )}
            />

            {/* Blocks */}
            <Section
              title="Blocks"
              loading={isLoading}
              error={error}
              emptyMsg="No blocks found."
              items={blocks}
              renderItem={(block) => (
                <PreviewLink
                  href={`${RESOURCES.blocks}/${block.height}`}
                  label={`${block.height}`}
                />
              )}
            />

            {/* Miner Rewards */}
            <Section
              title="Miner Rewards"
              loading={isLoading}
              error={error}
              emptyMsg="No miner rewards found."
              items={minerRewards}
              renderItem={(minerReward) => (
                <PreviewLink
                  href={`${RESOURCES.minerRewards}/${minerReward.block.hash}`}
                  label={`${minerReward.block.hash}`}
                />
              )}
            />

            {/* High Security Sets */}
            <Section
              title="High Security Sets"
              loading={isLoading}
              error={error}
              emptyMsg="No high security sets found."
              items={highSecuritySets}
              renderItem={(highSecuritySet) => (
                <PreviewLink
                  href={`${RESOURCES.highSecuritySets}/${highSecuritySet.extrinsicHash}`}
                  label={`${highSecuritySet.extrinsicHash}`}
                />
              )}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
);

SearchPreview.displayName = 'SearchPreview';
