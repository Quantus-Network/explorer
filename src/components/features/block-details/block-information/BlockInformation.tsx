import type { QueryResult } from '@apollo/client';
import * as React from 'react';

import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { BlockResponse } from '@/schemas';
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

export const BlockInformation: React.FC<BlockInformationProps> = ({
  query
}) => {
  const { data, loading } = query;
  const block = data?.blocks?.[0];

  const extrinsicsCount = block?.extrinsics?.length ?? 0;
  const miner = data?.minerRewards?.[0]?.miner.id;

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
          render: (value) => formatMonetaryValue(value)
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
