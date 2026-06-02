import { Link, useSearch } from '@tanstack/react-router';
import * as React from 'react';

export const MultisigProposalCreatedHeading: React.FC = () => {
  const { block } = useSearch({
    strict: false
  }) as { block?: string };

  return (
    <div>
      <h1>Proposal Created</h1>
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
          A list of all multisig proposal creation events on the network.
        </p>
      )}
    </div>
  );
};
