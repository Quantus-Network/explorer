import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { CancelledReversibleTransactionResponse } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface CancelledReversibleTransactionInformationProps {
  txId: string;
}

type CancelledReversibleTransaction =
  CancelledReversibleTransactionResponse['cancelledReversibleTransactions'][0];

export const CancelledReversibleTransactionInformation: React.FC<
  CancelledReversibleTransactionInformationProps
> = ({ txId }) => {
  const api = useApiClient();
  const { data, loading } = api.cancelledReversibleTransactions
    .getByTxId()
    .useQuery(txId);

  if (!loading && (!data || data.cancelledReversibleTransactions.length !== 1))
    throw notFound();

  const tx = data?.cancelledReversibleTransactions[0];

  const information: Partial<CancelledReversibleTransaction>[] = [
    {
      txId: tx?.txId,
      block: tx?.block,
      timestamp: tx?.timestamp,
      cancelledBy: tx?.cancelledBy,
      extrinsicHash: tx?.extrinsicHash,
      scheduledTransfer: tx?.scheduledTransfer
    }
  ];

  return (
    <DataList<Partial<CancelledReversibleTransaction>>
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
          label: 'Cancelled By',
          key: 'cancelledBy',
          render: (value) => (
            <LinkWithCopy
              text={value.id}
              href={`${RESOURCES.accounts}/${value.id}`}
              className="break-all"
            />
          )
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
