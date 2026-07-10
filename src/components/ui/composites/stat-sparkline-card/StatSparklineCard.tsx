import type { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { Sparkline, type SparklinePoint } from './Sparkline';

export interface StatSparklineCardProps {
  label: string;
  value?: ReactNode;
  subtitle?: ReactNode;
  points?: SparklinePoint[];
  stroke: string;
  live?: boolean;
  loading?: boolean;
  error?: string | null;
  valueClassName?: string;
}

export const StatSparklineCard = ({
  label,
  value,
  subtitle,
  points = [],
  stroke,
  live = false,
  loading = false,
  error,
  valueClassName
}: StatSparklineCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <h3>{label}</h3>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col pb-0 pt-2">
        {loading && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        )}

        {!loading && error && (
          <div className="font-mono text-sm text-destructive">{error}</div>
        )}

        {!loading && !error && (
          <>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'font-mono text-2xl font-medium tracking-[-0.02em] text-content',
                  valueClassName
                )}
              >
                {value}
              </div>
              {live && (
                <span
                  className="size-1.5 shrink-0 rounded-full bg-sage animate-live-pulse"
                  aria-label="Live"
                />
              )}
            </div>

            {subtitle != null && (
              <div className="mt-1 font-mono text-[11px] text-muted-text">
                {subtitle}
              </div>
            )}
          </>
        )}

        <div className="mt-auto">
          {!loading && !error && points.length > 0 ? (
            <Sparkline points={points} stroke={stroke} />
          ) : (
            <div className="h-14" aria-hidden />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
