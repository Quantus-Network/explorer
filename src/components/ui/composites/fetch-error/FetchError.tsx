import type { ReactNode } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type FetchErrorSource =
  | Error
  | { message: string }
  | string
  | null
  | undefined
  | false;

function resolveMessage(error: FetchErrorSource, fallback: string) {
  if (!error) return fallback;
  if (typeof error === 'string' && error.trim()) return error;
  if (
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string' &&
    error.message.trim()
  ) {
    return error.message;
  }
  return fallback;
}

export interface FetchErrorProps {
  error?: FetchErrorSource;
  title?: string;
  fallbackMessage?: string;
  className?: string;
}

/** Block-level fetch/error state aligned with the explorer status theme. */
export function FetchError({
  error,
  title = 'Error',
  fallbackMessage = 'Something went wrong while loading this data.',
  className
}: FetchErrorProps) {
  return (
    <Alert variant="destructive" className={cn(className)}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {resolveMessage(error, fallbackMessage)}
      </AlertDescription>
    </Alert>
  );
}

export interface InlineFetchErrorProps {
  error?: FetchErrorSource;
  fallbackMessage?: string;
  className?: string;
  children?: ReactNode;
}

/** Compact fetch/error text for stat cards and dense layouts. */
export function InlineFetchError({
  error,
  fallbackMessage = 'Failed to load',
  className,
  children
}: InlineFetchErrorProps) {
  return (
    <span
      role="alert"
      className={cn(
        'font-mono text-[12px] font-normal tracking-normal text-ember',
        className
      )}
    >
      {children ?? resolveMessage(error, fallbackMessage)}
    </span>
  );
}
