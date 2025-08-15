import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import api from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TransactionStatus } from '@/components/ui/transaction-status';
import { RESOURCES } from '@/constants/resources';
import type { ReversibleTransactionResponse } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface ReversibleTransactionInformationProps {
  hash: string;
}

type ReversibleTransaction =
  ReversibleTransactionResponse['reversibleTransactions'][0];

export const ReversibleTransactionInformation: React.FC<
  ReversibleTransactionInformationProps
> = ({ hash }) => {
  const { data, loading } = api.reversibleTransactions
    .getByHash()
    .useQuery(hash);

  if (!loading && (!data || data.reversibleTransactions.length !== 1))
    throw notFound();

  const tx = data?.reversibleTransactions[0];

  const information: Partial<ReversibleTransaction>[] = [
    {
      txId: tx?.txId,
      amount: tx?.amount,
      extrinsicHash: tx?.extrinsicHash,
      block: tx?.block,
      timestamp: tx?.timestamp,
      scheduledAt: tx?.scheduledAt,
      from: tx?.from,
      to: tx?.to,
      fee: tx?.fee,
      status: tx?.status
    }
  ];

  return (
    <DataList<Partial<ReversibleTransaction>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'ID',
          key: 'txId',
          render: (value) => <span className="break-all">{value}</span>
        },
        {
          label: 'Extrinsic Hash',
          key: 'extrinsicHash',
          render: (value) => (
            <TextWithCopy text={value || '-'} className="break-all" />
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
          render: (value) => formatTimestamp(value, true)
        },
        {
          label: 'Scheduled At',
          key: 'scheduledAt',
          render: (value) => formatTimestamp(value, true)
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
        },
        {
          label: 'Status',
          key: 'status',
          render: (value) => (
            <TransactionStatus
              status={data?.reversibleTransactions[0].status ?? value}
            />
          )
        }
      ]}
    />
  );
};
