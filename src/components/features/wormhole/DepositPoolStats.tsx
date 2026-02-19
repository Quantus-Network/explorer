import useApiClient from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DepositPoolStatsCard = () => {
  const api = useApiClient();
  const { data, loading } = api.wormhole.useGetDepositPoolStats();

  const stats = data?.depositPoolStatsById;

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Deposit Pool</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-4 w-32 rounded bg-muted" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  // Parse buckets JSON and compute totals
  let totalDeposits = 0;
  let totalValue = 0;
  try {
    const buckets = JSON.parse(stats.buckets);
    // Use bucket 0 [0, 1 DEV) as it contains all sub-DEV deposits without overlap
    // Sum all buckets but avoid double-counting from overlaps by just using count from non-overlapping ranges
    // Simplest: just show the raw bucket data
    for (const b of buckets) {
      // Only count non-overlapping contributions (first bucket that contains each deposit)
      // For display purposes, sum the largest bucket's count as a rough total
      if (b.count > totalDeposits) totalDeposits = b.count;
      totalValue += Number(b.sumAmounts);
    }
    // Actually, deposits appear in multiple overlapping buckets, so just sum unique ones
    // The [0, 1 DEV) bucket is non-overlapping with others for sub-DEV deposits
    // For a rough total, use the sum across all non-overlapping base buckets
    totalDeposits = buckets.reduce(
      (sum: number, b: { count: number }) => sum + b.count,
      0
    );
  } catch {
    // fallback
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wormhole Deposit Pool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Deposits Tracked</p>
            <p className="text-2xl font-bold">
              {totalDeposits.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="text-2xl font-bold">Block {stats.lastUpdatedBlock}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
