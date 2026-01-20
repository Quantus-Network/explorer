import { Link, useSearch } from '@tanstack/react-router';
import * as React from 'react';

export interface HighSecuritySetsHeadingProps {}

export const HighSecuritySetsHeading: React.FC<
  HighSecuritySetsHeadingProps
> = () => {
  const { accountId, block } = useSearch({
    strict: false
  }) as any;

  return (
    <div>
      <h1>High Security Sets</h1>

      {block && (
        <div className="flex gap-1">
          <span>In block</span>
          <Link to="/blocks/$id" params={{ id: block }}>
            {block}
          </Link>
        </div>
      )}

      {accountId && (
        <div className="flex gap-1">
          <span>By</span>
          <Link to="/accounts/$id" params={{ id: accountId }}>
            {accountId}
          </Link>
        </div>
      )}
    </div>
  );
};
