import { Link, useSearch } from '@tanstack/react-router';
import * as React from 'react';

export interface ErrorEventsHeadingProps {}

export const ErrorEventsHeading: React.FC<ErrorEventsHeadingProps> = () => {
  const { block } = useSearch({
    strict: false
  }) as any;

  return (
    <div>
      <h1>Error Events</h1>
      {block ? (
        <div className="mt-1 flex gap-1 text-sm text-muted-foreground">
          <span>In block</span>
          <Link
            to="/blocks/$id"
            params={{ id: block }}
            className="text-primary hover:underline"
          >
            {block}
          </Link>
        </div>
      ) : (
        <p className="mt-1 text-sm text-muted-foreground">
          A list of all error events that occurred on the network.
        </p>
      )}
    </div>
  );
};
