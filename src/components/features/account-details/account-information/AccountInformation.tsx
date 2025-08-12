import type { QueryResult } from '@apollo/client';
import * as React from 'react';

import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { Skeleton } from '@/components/ui/skeleton';
import { RESOURCES } from '@/constants/resources';
import { useChecksum } from '@/hooks/useChecksum';
import type { AccountResponse } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';

export interface AccountInformationProps {
  accountId: string;
  query: QueryResult<AccountResponse>;
}

export const AccountInformation: React.FC<AccountInformationProps> = ({
  accountId,
  query
}) => {
  const { data, loading } = query;
  const account = data?.account;

  const { checksum, loading: checksumLoading } = useChecksum(
    loading,
    accountId
  );
  const transactions = data?.transactions.totalCount;
  const reversibleTransactions = data?.reversibleTransactions.totalCount;

  const information = [
    {
      id: accountId,
      free: account?.free ?? 0,
      frozen: account?.frozen ?? 0,
      reserved: account?.reserved ?? 0,
      transactions,
      reversibleTransactions,
      checksum
    }
  ];

  return (
    <DataList
      loading={loading}
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
          key: 'checksum',
          tooltip:
            'A human-readable checksum from cryptocurrency address; designed to make address verification easier and prevent address poisoning attacks—where attackers craft lookalike addresses to trick users.',
          render: (value) =>
            checksumLoading ? (
              <Skeleton className="h-6" />
            ) : (
              <TextWithCopy text={value} />
            )
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
          label: 'Immediate Transactions',
          key: 'transactions',
          render: (value) =>
            value > 1 ? `${value} transactions` : `${value} transaction`
        },
        {
          label: 'Reversible Transactions',
          key: 'reversibleTransactions',
          render: (value) =>
            value > 1 ? `${value} transactions` : `${value} transaction`
        }
      ]}
    />
  );
};
