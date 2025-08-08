import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import api from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { TransactionListResponse } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface TransactionInformationProps {
  hash: string;
}

type Transaction = TransactionListResponse['transactions'][0];

export const TransactionInformation: React.FC<TransactionInformationProps> = ({
  hash
}) => {
  const { data, loading } = api.transactions.getByHash().useQuery(hash);

  if (!loading && (!data || data.transactions.length !== 1)) throw notFound();

  const tx = data?.transactions[0];

  const information: Partial<Transaction>[] = [
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
    <DataList<Partial<Transaction>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic Hash',
          key: 'extrinsicHash',
          render: (value) => (
            <LinkWithCopy
              text={value as string}
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
              text={(value as Transaction['block']).height.toString()}
              href={`${RESOURCES.blocks}/${(value as Transaction['block']).height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Timestamp',
          key: 'timestamp',
          render: (value) => formatTimestamp(value, true)
        },
        {
          label: 'From',
          key: 'from',
          render: (value) => (
            <LinkWithCopy
              text={(value as Transaction['from']).id}
              href={`${RESOURCES.accounts}/${(value as Transaction['from']).id}`}
              className="break-all"
            />
          )
        },
        {
          label: 'To',
          key: 'to',
          render: (value) => (
            <LinkWithCopy
              text={(value as Transaction['to']).id}
              href={`${RESOURCES.accounts}/${(value as Transaction['to']).id}`}
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
