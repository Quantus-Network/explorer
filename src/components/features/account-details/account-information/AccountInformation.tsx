import type { QueryResult } from '@apollo/client';
import * as React from 'react';

import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/link-with-copy';
import { RESOURCES } from '@/constants/resources';
import type { AccountResponse } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';

export interface AccountInformationProps {
  query: QueryResult<AccountResponse>;
}

export const AccountInformation: React.FC<AccountInformationProps> = ({
  query
}) => {
  const { data, loading } = query;

  const account = data?.account;
  const transactionCount = data?.transactions.totalCount;

  const information = [
    { id: account?.id, balance: account?.balance, transactionCount }
  ];

  return (
    <DataList
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Account ID',
          key: 'id',
          render: (value) => (
            <LinkWithCopy
              text={value}
              href={`${RESOURCES.accounts}/${value}`}
            />
          )
        },
        {
          label: 'Balance',
          key: 'balance',
          render: (value) => formatMonetaryValue(value)
        },
        {
          label: 'Transaction Count',
          key: 'transactionCount'
        }
      ]}
    />
  );
};
