import Link from 'next/link';
import React from 'react';

import api from '@/api';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RESOURCES } from '@/constants/resources';

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

// Helper: Section for each resource
function Section({ title, loading, error, emptyMsg, items, renderItem }: any) {
  let content;
  if (loading) {
    content = <Skeleton className="mb-2 h-8 w-full" />;
  } else if (error) {
    content = (
      <div className="px-2 py-1 text-sm text-destructive">
        Error loading {title.toLowerCase()}.
      </div>
    );
  } else if (items.length === 0) {
    content = (
      <div className="px-2 py-1 text-sm text-muted-foreground">{emptyMsg}</div>
    );
  } else {
    content = (
      <ul className="flex flex-col gap-1" role="group">
        {items.map((item: any, idx: number) => (
          <li key={idx}>{renderItem(item)}</li>
        ))}
      </ul>
    );
  }
  return (
    <div>
      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
        {title}
      </div>
      {content}
    </div>
  );
}

interface SearchPreviewProps {
  keyword: string;
  onSelect?: () => void;
}

export const SearchPreview: React.FC<SearchPreviewProps> = ({
  keyword,
  onSelect
}) => {
  // Only search if keyword is not empty
  const shouldSearch = Boolean(keyword && keyword.trim());

  // Transactions search (by id or hash)
  const {
    data: txData,
    loading: txLoading,
    error: txError
  } = api.transactions.useGetAll({
    skip: !shouldSearch,
    variables: {
      limit: 3,
      offset: 0,
      // Try to match id or extrinsicHash
      // This assumes the backend supports id_contains or extrinsicHash_contains
      where: {
        OR: [{ id_contains: keyword }, { extrinsicHash_contains: keyword }]
      }
    }
  } as any); // 'where' may need backend support

  // Accounts search (by id)
  const {
    data: accData,
    loading: accLoading,
    error: accError
  } = api.accounts.useGetAll({
    skip: !shouldSearch,
    variables: {
      limit: 3,
      offset: 0,
      // This assumes the backend supports id_contains
      where: { id_contains: keyword }
    }
  } as any);

  // Block preview: if keyword is a number
  const blockNumber = Number(keyword);
  const isBlock = !Number.isNaN(blockNumber) && keyword.trim() !== '';

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
            loading={txLoading}
            error={txError}
            emptyMsg="No transactions found."
            items={txData?.transactions || []}
            renderItem={(tx: any) => (
              <PreviewLink
                href={`${RESOURCES.transactions}/${tx.id}`}
                label={`Tx: ${tx.id}`}
                onSelect={onSelect}
              />
            )}
          />

          {/* Accounts */}
          <Section
            title="Accounts"
            loading={accLoading}
            error={accError}
            emptyMsg="No accounts found."
            items={accData?.accounts || []}
            renderItem={(acc: any) => (
              <PreviewLink
                href={`${RESOURCES.accounts}/${acc.id}`}
                label={`Account: ${acc.id}`}
                onSelect={onSelect}
              />
            )}
          />

          {/* Blocks */}
          <div>
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
              Blocks
            </div>
            {isBlock ? (
              <PreviewLink
                href={`${RESOURCES.blocks}/${blockNumber}`}
                label={`Block: #${blockNumber}`}
                onSelect={onSelect}
              />
            ) : (
              <div className="px-2 py-1 text-sm text-muted-foreground">
                Enter a block number
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
