import type { QueryResult } from '@apollo/client';
import * as React from 'react';

import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { BlockResponse, BlockRewardTransfer } from '@/schemas';
import { formatBlockHeight, formatMonetaryValue } from '@/utils/formatter';

export interface BlockInformationProps {
  query: QueryResult<BlockResponse>;
}

interface BlockDetails {
  height: number;
  hash: string;
  timestamp: string;
  reward: number;
  miner: string;
  extrinsicsCount: number;
}

function splitRewardTransfers(
  transfers: BlockRewardTransfer[] | undefined,
  minerId: string | undefined
) {
  const rows = transfers ?? [];
  const minerTransfer = minerId
    ? rows.find((row) => row.to?.id === minerId)
    : undefined;
  const treasuryTransfers = rows.filter((row) => row !== minerTransfer);

  return { minerTransfer, treasuryTransfers };
}

function RewardRecipient({
  label,
  amount,
  accountId,
  fallbackAmount
}: {
  label: string;
  amount: string | null | undefined;
  accountId?: string | null;
  fallbackAmount?: string | number | null;
}) {
  const displayAmount =
    amount ?? (fallbackAmount != null ? String(fallbackAmount) : null);
  if (displayAmount == null && !accountId) return null;

  return (
    <div className="flex flex-col gap-0.5 text-sm">
      <span className="font-mono">
        <span className="text-muted-text">{label}: </span>
        {displayAmount != null ? formatMonetaryValue(displayAmount) : '—'}
      </span>
      {accountId ? (
        <LinkWithCopy
          href={`${RESOURCES.accounts}/${accountId}`}
          text={accountId}
          truncate={false}
          textCopy={accountId}
          className="text-xs text-muted-text"
        />
      ) : null}
    </div>
  );
}

export const BlockInformation: React.FC<BlockInformationProps> = ({
  query
}) => {
  const { data, loading } = query;
  const block = data?.blocks?.[0];

  const extrinsicsCount = block?.extrinsics?.length ?? 0;
  const miner = data?.minerRewards?.[0]?.miner.id;
  const minerRewardFallback = data?.minerRewards?.[0]?.reward;
  const { minerTransfer, treasuryTransfers } = splitRewardTransfers(
    data?.rewardTransfers,
    miner
  );
  const treasuryTransfer = treasuryTransfers[0];

  const information: Partial<BlockDetails>[] = [
    {
      height: block?.height,
      hash: block?.hash,
      miner,
      reward: block?.reward,
      timestamp: block?.timestamp,
      extrinsicsCount
    }
  ];

  return (
    <DataList<Partial<BlockDetails>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Height',
          key: 'height',
          render: (value) =>
            value != null ? (
              <span className="font-mono text-flare">
                {formatBlockHeight(value as number)}
              </span>
            ) : (
              <span className="text-muted-text">—</span>
            )
        },
        {
          label: 'Hash',
          key: 'hash',
          render: (value) =>
            value ? (
              <TextWithCopy text={value as string} />
            ) : (
              <span className="text-muted-text">—</span>
            )
        },
        {
          label: 'Mined by',
          key: 'miner',
          render: (value) =>
            value ? (
              <LinkWithCopy
                href={`${RESOURCES.accounts}/${value}`}
                text={value}
                truncate={false}
                textCopy={value as string}
              />
            ) : (
              "Miner address isn't registered."
            )
        },
        {
          label: 'Reward',
          key: 'reward',
          render: (value) => {
            const hasBreakdown =
              minerTransfer != null ||
              treasuryTransfer != null ||
              minerRewardFallback != null;

            return (
              <div className="flex flex-col gap-2">
                <span className="font-mono">
                  {formatMonetaryValue(String(value ?? 0))}
                </span>
                {hasBreakdown ? (
                  <div className="flex flex-col gap-2 border-t border-border-subtle pt-2">
                    <RewardRecipient
                      label="Miner"
                      amount={minerTransfer?.amount}
                      accountId={minerTransfer?.to?.id ?? miner}
                      fallbackAmount={minerRewardFallback}
                    />
                    <RewardRecipient
                      label="Treasury"
                      amount={treasuryTransfer?.amount}
                      accountId={treasuryTransfer?.to?.id}
                    />
                  </div>
                ) : null}
              </div>
            );
          }
        },
        {
          label: 'Time',
          key: 'timestamp',
          render: (value) => <TimestampDisplay timestamp={value as string} />
        },
        {
          label: 'Transactions',
          key: 'extrinsicsCount',
          render: (value) => (
            <span className="font-mono">{value as number}</span>
          )
        }
      ]}
    />
  );
};
