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
    {
      id: account?.id,
      free: account?.free,
      frozen: account?.frozen,
      reserved: account?.reserved,
      transactionCount,
      checksum
    }
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
          label: 'Free Balance',
          key: 'free',
          render: (value) => formatMonetaryValue(value),
          tooltip: 'The amount of tokens that can be used.'
        },
        {
          label: 'Frozen Balance',
          key: 'frozen',
          render: (value) => formatMonetaryValue(value),
          tooltip:
            'The amount of tokens that are locked and cannot be used. It will be released if reversible transaction is cancelled. If the reversible transaction is executed, it will be transferred and this frozen balance will be deducted.'
        },
        {
          label: 'Reserved Balance',
          key: 'reserved',
          render: (value) => formatMonetaryValue(value),
          tooltip: 'The amount of tokens that are locked and cannot be used. '
        },
        {
          label: 'Transaction Count',
          key: 'transactionCount'
        }
      ]}
    />
  );
};
