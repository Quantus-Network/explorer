import * as React from 'react';

import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TransactionStatus } from '@/components/ui/transaction-status';
import { RESOURCES } from '@/constants/resources';
import type { ReversibleTransaction } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

export interface ReversibleTransactionInformationProps {
  transaction: ReversibleTransaction;
}

export const ReversibleTransactionInformation: React.FC<
  ReversibleTransactionInformationProps
> = ({ transaction }) => {
  return (
    <DataList
      data={[transaction]}
      fields={[
        {
          label: 'Transaction',
          key: 'tx',
          render: (value) => (
            <LinkWithCopy
              text={value}
              href={`${RESOURCES.transactions}/${value}`}
              className="break-all"
            />
          )
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
          label: 'Owner',
          key: 'who',
          render: (value) => (
            <LinkWithCopy
              text={value.id}
              href={`${RESOURCES.accounts}/${value.id}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Status',
          key: 'status',
          render: (value) => <TransactionStatus status={value} />
        }
      ]}
    />
  );
};
