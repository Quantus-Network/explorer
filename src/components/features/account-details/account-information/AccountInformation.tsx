import type { QueryResult } from '@apollo/client';
import * as React from 'react';

import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import { useChecksum } from '@/hooks/useChecksum';
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

  const { checksum, loading: checksumLoading } = useChecksum(account?.id);
  const transactionCount = data?.transactions.totalCount;

  const information = [
    { id: account?.id, balance: account?.balance, transactionCount, checksum }
  ];

  return (
    <DataList
      loading={loading || checksumLoading}
      data={information}
      fields={[
        {
          label: 'ID',
          key: 'id',
          render: (value) => (
            <LinkWithCopy
              text={value}
              href={`${RESOURCES.accounts}/${value}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Check Phrase',
          key: 'checksum'
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
