import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { ScheduledReversibleTransactionResponse } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface ScheduledReversibleTransactionInformationProps {
  txId: string;
}

type ScheduledReversibleTransaction =
  ScheduledReversibleTransactionResponse['scheduledReversibleTransactions'][0];

export const ScheduledReversibleTransactionInformation: React.FC<
  ScheduledReversibleTransactionInformationProps
> = ({ txId }) => {
  const api = useApiClient();
  const { data, loading } = api.scheduledReversibleTransactions
    .getByTxId()
    .useQuery(txId);

  if (!loading && (!data || data.scheduledReversibleTransactions.length !== 1))
    throw notFound();

  const tx = data?.scheduledReversibleTransactions[0];

  const information: Partial<ScheduledReversibleTransaction>[] = [
    {
      txId: tx?.txId,
      amount: tx?.amount,
      extrinsicHash: tx?.extrinsicHash,
      block: tx?.block,
      timestamp: tx?.timestamp,
      scheduledAt: tx?.scheduledAt,
      from: tx?.from,
      to: tx?.to,
      fee: tx?.fee
    }
  ];

  return (
    <DataList<Partial<ScheduledReversibleTransaction>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'ID',
          key: 'txId',
          render: (value) => (
            <TextWithCopy text={value || '-'} className="break-all" />
          )
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
        }
      ]}
    />
  );
};
