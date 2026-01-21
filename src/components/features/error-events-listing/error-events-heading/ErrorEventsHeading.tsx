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

      {block && (
        <div className="flex gap-1">
          <span>In block</span>
          <Link to="/blocks/$id" params={{ id: block }}>
            {block}
          </Link>
        </div>
      )}
    </div>
  );
};
