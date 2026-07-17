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
  minerReward: string | null;
  treasuryReward: string | null;
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

function formatRewardAmount(amount: string | null | undefined) {
  if (amount == null) return <span className="text-muted-text">—</span>;
  return <span className="font-mono">{formatMonetaryValue(amount)}</span>;
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

  const minerReward =
    minerTransfer?.amount ??
    (minerRewardFallback != null ? String(minerRewardFallback) : null);
  const treasuryReward = treasuryTransfer?.amount ?? null;

  const information: Partial<BlockDetails>[] = [
    {
      height: block?.height,
      hash: block?.hash,
      miner,
      minerReward,
      treasuryReward,
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
          label: 'Miner reward',
          key: 'minerReward',
          render: (value) => formatRewardAmount(value as string | null)
        },
        {
          label: 'Treasury reward',
          key: 'treasuryReward',
          render: (value) => formatRewardAmount(value as string | null)
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
