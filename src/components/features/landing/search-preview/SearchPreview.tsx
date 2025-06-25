import Link from 'next/link';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RESOURCES } from '@/constants/resources';
import type { SearchAllResponse } from '@/schemas/searchs';

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
      href={href}
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
            <li key={idx}>{renderItem(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface SearchPreviewProps {
  searchResult?: SearchAllResponse;
  isLoading: boolean;
  error?: string;
}

export const SearchPreview: React.FC<SearchPreviewProps> = ({
  searchResult,
  isLoading,
  error
}) => {
  const { accounts, transactions } = searchResult || {};

  if (!isLoading && !transactions) {
    return null;
  }

  // Accessibility: aria attributes
  return (
    <div
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
        </CardContent>
      </Card>
    </div>
  );
};
