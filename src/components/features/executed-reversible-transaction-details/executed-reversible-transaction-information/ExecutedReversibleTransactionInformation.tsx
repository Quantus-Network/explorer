import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { ExecutedReversibleTransactionResponse } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface ExecutedReversibleTransactionInformationProps {
  txId: string;
}

type ExecutedReversibleTransaction =
  ExecutedReversibleTransactionResponse['executedReversibleTransactions'][0];

export const ExecutedReversibleTransactionInformation: React.FC<
  ExecutedReversibleTransactionInformationProps
> = ({ txId }) => {
  const api = useApiClient();
  const { data, loading } = api.executedReversibleTransactions
    .getByTxId()
    .useQuery(txId);

  if (!loading && (!data || data.executedReversibleTransactions.length !== 1))
    throw notFound();

  const tx = data?.executedReversibleTransactions[0];

  const information: Partial<ExecutedReversibleTransaction>[] = [
    {
      txId: tx?.txId,
      block: tx?.block,
      timestamp: tx?.timestamp,
      scheduledTransfer: tx?.scheduledTransfer
    }
  ];

  return (
    <DataList<Partial<ExecutedReversibleTransaction>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'ID',
          key: 'txId',
          render: (value) => <span className="break-all">{value}</span>
        },
        {
          label: 'Extrinsic Hash (Scheduled)',
          key: 'scheduledTransfer',
          render: (value) => (
            <TextWithCopy
              text={value.extrinsicHash || '-'}
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
          render: (value) => formatTimestamp(value, true)
        },
        {
          label: 'From',
          key: 'scheduledTransfer',
          render: (value) => (
            <LinkWithCopy
              text={value.from.id}
              href={`${RESOURCES.accounts}/${value.from.id}`}
              className="break-all"
            />
          )
        },
        {
          label: 'To',
          key: 'scheduledTransfer',
          render: (value) => (
            <LinkWithCopy
              text={value.to.id}
              href={`${RESOURCES.accounts}/${value.to.id}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Amount',
          key: 'scheduledTransfer',
          render: (value) => formatMonetaryValue(value.amount)
        },
        {
          label: 'Fee',
          key: 'scheduledTransfer',
          render: (value) => formatMonetaryValue(value.fee)
        }
      ]}
    />
  );
};
