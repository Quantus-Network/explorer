import * as React from 'react';

export const MultisigProposalHeading: React.FC = () => (
  <div className="flex flex-col gap-2">
    <h1>Multisig Proposals</h1>
    <p className="text-muted-foreground text-sm">
      Browse on-chain multisig proposals and their current state.
    </p>
  </div>
);
