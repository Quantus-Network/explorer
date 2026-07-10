import React from 'react';

import { CardGroup } from '@/components/ui/card';
import { StatSparklineCard } from '@/components/ui/composites/stat-sparkline-card';

import { useChainStats } from './hook';

const STROKE_FLARE = 'var(--flare)';
const STROKE_GLACIER = 'var(--glacier)';
const STROKE_MUTED = 'var(--muted-text)';

export interface ChainStatsProps {}

export const ChainStats: React.FC<ChainStatsProps> = () => {
  const {
    loading,
    error,
    blockHeight,
    totalTransactions,
    last24HourTransactions,
    activeAccounts,
    totalAccounts,
    blocksPoints,
    transfersPoints,
    activeAccountsPoints
  } = useChainStats();

  const errorMessage = error?.message ?? null;

  return (
    <CardGroup className="grid-cols-1 sm:grid-cols-3">
      <StatSparklineCard
        label="Latest Block"
        loading={loading}
        error={errorMessage}
        live
        value={
          blockHeight != null ? `#${blockHeight.toLocaleString()}` : undefined
        }
        subtitle="~12s block time"
        points={blocksPoints}
        stroke={STROKE_FLARE}
        valueClassName="text-flare"
      />

      <StatSparklineCard
        label="Total Transactions"
        loading={loading}
        error={errorMessage}
        value={totalTransactions.toLocaleString()}
        subtitle={`${last24HourTransactions.toLocaleString()} in last 24h`}
        points={transfersPoints}
        stroke={STROKE_GLACIER}
      />

      <StatSparklineCard
        label="Active Accounts"
        loading={loading}
        error={errorMessage}
        value={activeAccounts.toLocaleString()}
        subtitle={`${totalAccounts.toLocaleString()} total`}
        points={activeAccountsPoints}
        stroke={STROKE_MUTED}
      />
    </CardGroup>
  );
};
