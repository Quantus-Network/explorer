import { Link, useSearch } from '@tanstack/react-router';
import * as React from 'react';

export interface TransactionHeadingProps {}

export const MinerRewardsHeading: React.FC<TransactionHeadingProps> = () => {
  const { accountId } = useSearch({
    strict: false
  }) as any;

  return (
    <div>
      <h1>Miner Rewards</h1>

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
