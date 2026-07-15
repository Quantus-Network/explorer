import * as React from 'react';

import { cn } from '@/lib/utils';

import { Skeleton } from '../../skeleton';

export interface CardSkeletonProps {
  cardCount?: number;
  fieldsLength: number;
  className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  cardCount = 1,
  fieldsLength,
  className
}) => {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {Array.from({ length: cardCount }).map((_, cardIdx) => (
        <div
          key={cardIdx}
          className="overflow-hidden rounded-none border border-border-subtle bg-surface"
        >
          <dl>
            {Array.from({ length: fieldsLength }).map((_, fieldIdx) => (
              <div
                key={fieldIdx}
                className={cn(
                  'grid grid-cols-1 gap-3 px-5 py-3',
                  fieldIdx < fieldsLength - 1 && 'border-b border-border-subtle'
                )}
              >
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
};
