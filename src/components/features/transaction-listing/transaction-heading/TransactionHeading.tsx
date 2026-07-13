import { Link, useSearch } from '@tanstack/react-router';
import * as React from 'react';

export interface TransactionHeadingProps {}

export const TransactionHeading: React.FC<TransactionHeadingProps> = () => {
  const { accountId, block } = useSearch({
    strict: false
  }) as { accountId?: string; block?: string };

  return (
    <div>
      <h1 className="page-title">Transactions</h1>

      {block && (
        <div className="page-subtitle flex gap-1">
          <span>In block</span>
          <Link
            className="text-flare no-underline hover:underline"
            to="/blocks/$id"
            params={{ id: block }}
          >
            {block}
          </Link>
        </div>
      )}

      {accountId && (
        <div className="page-subtitle flex gap-1">
          <span>By</span>
          <Link
            className="text-flare no-underline hover:underline"
            to="/accounts/$id"
            params={{ id: accountId }}
          >
            {accountId}
          </Link>
        </div>
      )}
    </div>
  );
};
