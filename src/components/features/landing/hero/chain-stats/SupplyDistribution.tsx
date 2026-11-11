import { formatChainSupply } from './format-chain-supply';
import type { SupplyBucket } from './supply-distribution';

const BUCKET_COLORS = ['bg-flare', 'bg-glacier', 'bg-sage'] as const;

const bucketColor = (index: number): string => {
  const color = BUCKET_COLORS[index];
  if (color == null) {
    throw new Error(`no color for supply bucket ${index}`);
  }
  return color;
};

const formatShare = (share: number) => `${share.toFixed(2)}%`;

export interface SupplyDistributionProps {
  buckets: SupplyBucket[];
}

export const SupplyDistribution = ({ buckets }: SupplyDistributionProps) => (
  <div className="mt-3 flex flex-col gap-2">
    <div className="flex h-1.5 w-full overflow-hidden bg-border-subtle">
      {buckets.map((bucket, index) => (
        <div
          key={bucket.label}
          data-testid="supply-bucket-segment"
          className={bucketColor(index)}
          style={{ width: formatShare(bucket.share) }}
        />
      ))}
    </div>

    <ul className="numeric flex flex-col gap-1 text-[11px] text-muted-text">
      {buckets.map((bucket, index) => (
        <li key={bucket.label} className="flex items-center gap-2">
          <span
            aria-hidden
            className={`size-1.5 shrink-0 rounded-full ${bucketColor(index)}`}
          />
          <span data-testid="supply-bucket-label">{bucket.label}</span>
          <span className="ml-auto whitespace-nowrap text-content">
            <span data-testid="supply-bucket-amount">
              {formatChainSupply(bucket.amount.toString())}
            </span>
            {' · '}
            <span data-testid="supply-bucket-share">
              {formatShare(bucket.share)}
            </span>
          </span>
        </li>
      ))}
    </ul>
  </div>
);
