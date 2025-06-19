import * as React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Field<T> {
  label: string;
  key: keyof T;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
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
  loadingFallback?: React.ReactNode;
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
  loadingFallback,
  errorFallback
}: DataListProps<T>) {
  if (loading)
    return (
      <Alert className={cn('my-4', className)}>
        <AlertTitle>Loading...</AlertTitle>
        <AlertDescription>
          {loadingFallback || 'Please wait while we load your data.'}
        </AlertDescription>
      </Alert>
    );
  if (error)
    return (
      <Alert variant="destructive" className={cn('my-4', className)}>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {errorFallback ? errorFallback(error) : error}
        </AlertDescription>
      </Alert>
    );
  if (!data || data.length === 0)
    return (
      <Alert className={cn('my-4', className)}>
        <AlertTitle>No data found</AlertTitle>
        <AlertDescription>
          {emptyFallback || 'There is no data to display.'}
        </AlertDescription>
      </Alert>
    );

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {data.map((item, idx) => {
        if (renderItem) {
          return (
            <React.Fragment key={idx}>{renderItem(item, idx)}</React.Fragment>
          );
        }

        if (fields) {
          return (
            <Card key={idx}>
              <CardContent className="p-4">
                <dl className="grid grid-cols-1 gap-y-2">
                  {fields.map((field) => (
                    <div
                      key={String(field.key)}
                      className="grid grid-cols-1 items-center lg:grid-cols-[300px_1fr]"
                    >
                      <dt className="flex items-center gap-1 font-medium text-muted-foreground">
                        {field.tooltip ? (
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-help underline decoration-dotted">
                                  {field.label}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>{field.tooltip}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          field.label
                        )}
                      </dt>
                      <dd>
                        {field.render
                          ? field.render(item[field.key], item)
                          : String(item[field.key] ?? '')}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          );
        }

        return null;
      })}
    </div>
  );
}
