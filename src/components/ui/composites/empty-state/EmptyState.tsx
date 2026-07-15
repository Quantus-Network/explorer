import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

/** Bordered empty placeholder aligned with the explorer v5 table empty state. */
export function EmptyState({
  title = 'No data found',
  description = 'There is no data to display for this query.',
  className
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-none border border-border-subtle px-5 py-8 text-center',
        className
      )}
    >
      <p className="mb-1 font-mono text-[13px] text-muted-text">{title}</p>
      {description ? (
        <p className="text-xs text-muted-text-2">{description}</p>
      ) : null}
    </div>
  );
}
