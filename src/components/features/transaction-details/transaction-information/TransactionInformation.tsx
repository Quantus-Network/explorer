import * as React from 'react';

import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { Transaction } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

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
          label: 'Transaction Hash',
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
