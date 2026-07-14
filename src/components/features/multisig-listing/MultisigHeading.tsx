import { Link, useSearch } from '@tanstack/react-router';
import * as React from 'react';

export const MultisigHeading: React.FC = () => {
  const { block } = useSearch({
    strict: false
  }) as { block?: string };

  return (
    <div>
      <h1 className="page-title">Multisig</h1>
      {block ? (
        <div className="page-subtitle mt-1 flex gap-1">
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
        <p className="page-subtitle mt-1">
          On-chain multisig wallets and their proposal lifecycle
        </p>
      )}
    </div>
  );
};
