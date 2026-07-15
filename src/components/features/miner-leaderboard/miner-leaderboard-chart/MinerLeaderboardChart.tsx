import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { InlineFetchError } from '@/components/ui/composites/fetch-error/FetchError';
import { Skeleton } from '@/components/ui/skeleton';
import { RESOURCES } from '@/constants/resources';

import { useMinerLeaderboardChart } from './hook';

export const MinerLeaderboardChart = () => {
  const { segments, legendItems, getStatus, error } =
    useMinerLeaderboardChart();
  const status = getStatus();

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-muted-text">
        Block Distribution
      </h2>

      <Card className="border border-border-subtle">
        <CardContent className="p-5 px-6">
          {status === 'loading' && <Skeleton className="h-16" />}
          {status === 'error' && <InlineFetchError error={error} />}
          {status === 'success' && segments.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <div
                className="flex h-9 w-full overflow-hidden"
                role="img"
                aria-label="Block mining distribution"
              >
                {segments.map((segment) => (
                  <div
                    key={segment.id ?? segment.label}
                    className="h-full min-w-px"
                    style={{
                      flex: `0 0 ${segment.pct}%`,
                      backgroundColor: segment.color
                    }}
                    title={`${segment.label}: ${segment.blocks.toLocaleString()} blocks (${segment.pct.toFixed(1)}%)`}
                  />
                ))}
              </div>

              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {legendItems.map((item) => (
                  <div
                    key={item.id ?? item.label}
                    className="flex items-center gap-1.5 font-mono text-[11px] text-muted-text"
                  >
                    <span
                      className="size-2 shrink-0"
                      style={{ backgroundColor: item.color }}
                      aria-hidden
                    />
                    {item.id ? (
                      <LinkWithCopy
                        href={`${RESOURCES.accounts}/${item.id}`}
                        text={item.label}
                        truncate={false}
                        className="text-[11px] text-muted-text hover:text-flare"
                      />
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
