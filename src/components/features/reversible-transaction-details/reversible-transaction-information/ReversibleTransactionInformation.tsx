import * as React from 'react';

import api from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { Skeleton } from '@/components/ui/skeleton';
import { TransactionStatus } from '@/components/ui/transaction-status';
import { RESOURCES } from '@/constants/resources';
import type { ReversibleTransaction } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface ReversibleTransactionInformationProps {
  transaction: ReversibleTransaction;
}

export const ReversibleTransactionInformation: React.FC<
  ReversibleTransactionInformationProps
> = ({ transaction }) => {
  const { data, loading } = api.reversibleTransactions
    .getStatusByHash()
    .useQuery(transaction.extrinsicHash ?? '');

  return (
    <DataList
      data={[transaction]}
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
            <LinkWithCopy
              text={value || '-'}
              href={`${RESOURCES.reversibleTransactions}/${value}`}
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
          label: 'Scheduled At',
          key: 'scheduledAt',
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
        },
        {
          label: 'Status',
          key: 'status',
          render: (value) =>
            loading ? (
              <Skeleton className="h-6" />
            ) : (
              <TransactionStatus
                status={data?.reversibleTransactions[0].status ?? value}
              />
            )
        }
      ]}
    />
  );
};
