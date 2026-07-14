import * as React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

import { Skeleton } from '../../skeleton';
import { Info } from '../info/Info';

interface Field<T> {
  label: string;
  key: keyof T;
  render?: (value: any, item: T) => React.ReactNode;
  tooltip?: string;
}

interface DataListProps<T> {
  data?: T[];
  fields?: Field<T>[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  loading?: boolean;
  error?: string | null;
  className?: string;
  emptyFallback?: React.ReactNode;
  errorFallback?: (error: string) => React.ReactNode;
}

export function DataList<T>({
  data,
  fields,
  renderItem,
  loading = false,
  error = null,
  className,
  emptyFallback,
  errorFallback
}: DataListProps<T>) {
  if (error)
    return (
      <Alert variant="destructive" className={cn(className)}>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {errorFallback ? errorFallback(error) : error}
        </AlertDescription>
      </Alert>
    );

  if (!data || data.length === 0)
    return (
      <Alert className={cn(className)}>
        <AlertTitle>No data found</AlertTitle>
        <AlertDescription>
          {emptyFallback || 'There is no data to display.'}
        </AlertDescription>
      </Alert>
    );

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {data.map((item, idx) => {
        if (renderItem) {
          return (
            <React.Fragment key={idx}>{renderItem(item, idx)}</React.Fragment>
          );
        }

        if (fields) {
          return (
            <div
              key={idx}
              className="mb-0 overflow-hidden rounded-none border border-border-subtle bg-surface"
            >
              <dl>
                {fields.map((field, fieldIdx) => (
                  <div
                    key={String(field.key) + String(field.label)}
                    className={cn(
                      'grid grid-cols-1 items-center gap-3 px-5 py-3 sm:grid-cols-[200px_1fr]',
                      fieldIdx < fields.length - 1 &&
                        'border-b border-border-subtle'
                    )}
                  >
                    <dt className="flex items-center gap-1 font-mono text-[12px] text-muted-text">
                      <span>{field.label}</span>

                      {field.tooltip && <Info>{field.tooltip}</Info>}
                    </dt>
                    {loading && <Skeleton className="h-6" />}

                    {!loading && (
                      <dd className="flex items-center gap-1.5 break-all text-[13px] text-content">
                        {field.render
                          ? field.render(item[field.key], item)
                          : String(item[field.key] ?? '')}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
