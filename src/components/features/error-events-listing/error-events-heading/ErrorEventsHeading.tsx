import { Link, useSearch } from '@tanstack/react-router';
import * as React from 'react';

export interface ErrorEventsHeadingProps {}

export const ErrorEventsHeading: React.FC<ErrorEventsHeadingProps> = () => {
  const { block } = useSearch({
    strict: false
  }) as any;

  return (
    <div>
      <h1 className="page-title">Error Events</h1>
      {block ? (
        <div className="page-subtitle flex gap-1">
          <span>In block</span>
          <Link
            to="/blocks/$id"
            params={{ id: block }}
            className="text-flare no-underline hover:underline"
          >
            {block}
          </Link>
        </div>
      ) : (
        <p className="page-subtitle">
          A list of all error events that occurred on the network.
        </p>
      )}
    </div>
  );
};
