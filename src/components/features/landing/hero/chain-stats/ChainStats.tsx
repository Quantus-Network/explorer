import React from 'react';

import {
  Card,
  CardContent,
  CardGroup,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { InlineFetchError } from '@/components/ui/composites/fetch-error/FetchError';
import { StatSparklineCard } from '@/components/ui/composites/stat-sparkline-card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatUsdPrice } from '@/lib/qtc-market';

import { formatChainSupply } from './format-chain-supply';
import { useChainStats } from './hook';
import { useQtcPrice } from './use-qtc-price';

const STROKE_FLARE = 'var(--flare)';
const STROKE_GLACIER = 'var(--glacier)';
const STROKE_MUTED = 'var(--muted-text)';
const STROKE_SAGE = 'var(--sage)';

export interface ChainStatsProps {}

const SupplyStatCard = ({
  label,
  value,
  formatted,
  loading,
  error
}: {
  label: string;
  value?: string;
  formatted?: string;
  loading: boolean;
  error: string | null;
}) => {
  const text =
    formatted ?? (value != null ? formatChainSupply(value) : undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3>{label}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-7 w-28" />}
        {!loading && error && <InlineFetchError error={error} />}
        {!loading && !error && text != null && <p>{text}</p>}
      </CardContent>
    </Card>
  );
};

export const ChainStats: React.FC<ChainStatsProps> = () => {
  const {
    loading,
    error,
    blockHeight,
    totalTransactions,
    last24HourTransactions,
    activeAccounts,
    blocksPoints,
    transfersPoints,
    activeAccountsPoints,
    transferredPoints,
    totalTransferred,
    last24HourTransferred,
    maxSupply,
    circulatingSupply
  } = useChainStats();
  const price = useQtcPrice();

  const errorMessage = error?.message ?? null;

  return (
    <div className="flex flex-col gap-px bg-border-subtle">
      <CardGroup className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
          label="Total Transferred"
          loading={loading}
          error={errorMessage}
          value={
            totalTransferred != null
              ? formatChainSupply(totalTransferred)
              : undefined
          }
          subtitle={`${formatChainSupply(last24HourTransferred)} in last 24h`}
          points={transferredPoints}
          stroke={STROKE_SAGE}
        />

        <StatSparklineCard
          label="Active Accounts"
          loading={loading}
          error={errorMessage}
          value={activeAccounts.toLocaleString()}
          points={activeAccountsPoints}
          stroke={STROKE_MUTED}
        />
      </CardGroup>

      <CardGroup className="grid-cols-1 sm:grid-cols-3">
        <SupplyStatCard
          label="QTC Price"
          loading={price.loading}
          error={price.error}
          formatted={
            price.priceUsd != null ? formatUsdPrice(price.priceUsd) : undefined
          }
        />
        <SupplyStatCard
          label="Max Supply"
          loading={loading}
          error={errorMessage}
          value={maxSupply}
        />
        <SupplyStatCard
          label="Coin Circulation"
          loading={loading}
          error={errorMessage}
          value={circulatingSupply}
        />
      </CardGroup>
    </div>
  );
};
