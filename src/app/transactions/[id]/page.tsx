import { notFound } from 'next/navigation';
import * as React from 'react';

import api from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/link-with-copy';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import { RESOURCES } from '@/constants/resources';
import { formatTimestamp } from '@/utils/formatter';

// This enables ISR
export const dynamicParams = true;

export interface TransactionDetailsProps {
  params: { id: string };
}

const TransactionDetails: React.FC<TransactionDetailsProps> = async ({
  params
}) => {
  const { data } = await api.transactions.getById().query(params.id);

  if (!data?.transaction) notFound();

  return (
    <SectionContainer>
      <ContentContainer className="flex flex-col gap-4">
        <h1>Transaction Details</h1>

        <DataList
          data={[data.transaction]}
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
      </ContentContainer>
    </SectionContainer>
  );
};

export default TransactionDetails;
