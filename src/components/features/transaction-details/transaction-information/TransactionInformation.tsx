import * as React from 'react';

import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/link-with-copy';
import { RESOURCES } from '@/constants/resources';
import type { Transaction } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

export interface TransactionInformationProps {
  transaction: Transaction;
}

export const TransactionInformation: React.FC<TransactionInformationProps> = ({
  transaction
}) => {
  return (
    <DataList
      data={[transaction]}
      fields={[
        {
          label: 'Transaction ID',
          key: 'id',
          render: (value) => (
            <LinkWithCopy
              text={value}
              href={`${RESOURCES.transactions}/${value}`}
            />
          )
        },
        {
          label: 'Transaction Hash',
          key: 'extrinsicHash'
        },
        {
          label: 'Block',
          key: 'blockNumber'
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
            />
          )
        },
        {
          label: 'Amount',
          key: 'amount'
        },
        {
          label: 'Fee',
          key: 'fee'
        }
      ]}
    />
  );
};
