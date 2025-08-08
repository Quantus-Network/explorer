import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import api from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface TransactionInformationProps {
  hash: string;
}

export const TransactionInformation: React.FC<TransactionInformationProps> = ({
  hash
}) => {
  const { data, loading } = api.transactions.getByHash().useQuery(hash);

  if (!loading && (!data || data.transactions.length !== 1)) throw notFound();

  const tx = data?.transactions[0];

  const information = [
    {
      amount: tx?.amount,
      extrinsicHash: tx?.extrinsicHash,
      block: tx?.block,
      timestamp: tx?.timestamp,
      from: tx?.from,
      to: tx?.to,
      fee: tx?.fee
    }
  ];

  return (
    <DataList
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic Hash',
          key: 'extrinsicHash',
          render: (value) => (
            <LinkWithCopy
              text={value}
              href={`${RESOURCES.transactions}/${value}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Block',
          key: 'block',
          render: (value) => (
            <LinkWithCopy
              text={value.height.toString()}
              href={`${RESOURCES.blocks}/${value.height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Timestamp',
          key: 'timestamp',
          render: formatTimestamp
        },
        {
          label: 'From',
          key: 'from',
          render: (value) => (
            <LinkWithCopy
              text={value.id}
              href={`${RESOURCES.accounts}/${value.id}`}
              className="break-all"
            />
          )
        },
        {
          label: 'To',
          key: 'to',
          render: (value) => (
            <LinkWithCopy
              text={value.id}
              href={`${RESOURCES.accounts}/${value.id}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Amount',
          key: 'amount',
          render: (value) => formatMonetaryValue(value)
        },
        {
          label: 'Fee',
          key: 'fee',
          render: (value) => formatMonetaryValue(value)
        }
      ]}
    />
  );
};
