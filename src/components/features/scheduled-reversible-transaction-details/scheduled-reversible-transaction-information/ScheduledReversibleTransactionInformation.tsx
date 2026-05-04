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

  const information: Partial<ScheduledReversibleTransaction['node']>[] = [
    {
      tx_id: tx?.node.tx_id,
      amount: tx?.node.amount,
      extrinsic: tx?.node.extrinsic,
      block: tx?.node.block,
      timestamp: tx?.node.timestamp,
      scheduled_at: tx?.node.scheduled_at,
      from: tx?.node.from,
      to: tx?.node.to,
      fee: (tx?.node as any).fee
    }
  ];

  return (
    <DataList<Partial<ScheduledReversibleTransaction['node']>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'ID',
          key: 'tx_id',
          render: (value) => (
            <TextWithCopy text={value || '-'} className="break-all" />
          )
        },
        {
          label: 'Extrinsic',
          key: 'extrinsic',
          render: (value) => (
            <TextWithCopy
              text={
                (value as ScheduledReversibleTransaction['node']['extrinsic'])
                  ?.id ?? '-'
              }
              className="break-all"
            />
          )
        },
        {
          label: 'Block',
          key: 'block',
          render: (value) => (
            <LinkWithCopy
              text={value?.height.toString() ?? '-'}
              href={`${RESOURCES.blocks}/${value?.height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Timestamp',
          key: 'timestamp',
          render: (value) => formatTimestamp(value as string, true)
        },
        {
          label: 'Scheduled At',
          key: 'scheduled_at',
          render: (value) => formatTimestamp(value as string, true)
        },
        {
          label: 'From',
          key: 'from',
          render: (value) => (
            <LinkWithCopy
              text={value?.id ?? '-'}
              href={`${RESOURCES.accounts}/${value?.id}`}
              className="break-all"
            />
          )
        },
        {
          label: 'To',
          key: 'to',
          render: (value) => (
            <LinkWithCopy
              text={value?.id ?? '-'}
              href={`${RESOURCES.accounts}/${value?.id}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Amount',
          key: 'amount',
          render: (value) => formatMonetaryValue(value as string)
        },
        {
          label: 'Fee',
          key: 'fee',
          render: (value) => formatMonetaryValue(value as string)
        }
      ]}
    />
  );
};
