import type { QueryResult } from '@apollo/client';
import * as React from 'react';

import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { BlockResponse } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface BlockInformationProps {
  query: QueryResult<BlockResponse>;
}

interface BlockDetails {
  height: number;
  hash: string;
  timestamp: string;
  reward: number;
  miner: string;
  transactions: number;
  reversibleTransactions: number;
}

export const BlockInformation: React.FC<BlockInformationProps> = ({
  query
}) => {
  const { data, loading } = query;
  const block = data?.blocks?.[0];

  const transactions = data?.transactions.totalCount;
  const reversibleTransactions = data?.reversibleTransactions.totalCount;
  const miner = data?.miners[0]?.miner.id;

  const information: Partial<BlockDetails>[] = [
    {
      height: block?.height,
      hash: block?.hash,
      reward: block?.reward,
      timestamp: block?.timestamp,
      transactions,
      miner,
      reversibleTransactions
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
          render: (value) => (
            <LinkWithCopy href={`${RESOURCES.blocks}/${value}`} text={value} />
          )
        },
        {
          label: 'Hash',
          key: 'hash',
          render: (value) => (
            <LinkWithCopy href={`${RESOURCES.blocks}/${value}`} text={value} />
          )
        },
        {
          label: 'Reward',
          key: 'reward',
          render: (value) => formatMonetaryValue(value)
        },
        {
          label: 'Mined by',
          key: 'miner',
          render: (value) =>
            value ? (
              <LinkWithCopy
                href={`${RESOURCES.accounts}/${value}`}
                text={value}
              />
            ) : (
              "Miner address isn't registered."
            )
        },
        {
          label: 'Timestamp',
          key: 'timestamp',
          render: (value) => formatTimestamp(value, true)
        },
        {
          label: 'Immediate Transactions',
          key: 'transactions',
          render: (value) =>
            value > 1 ? `${value} transactions` : `${value} transaction`
        },
        {
          label: 'Reversible Transactions',
          key: 'reversibleTransactions',
          render: (value) =>
            value > 1 ? `${value} transactions` : `${value} transaction`
        }
      ]}
    />
  );
};
