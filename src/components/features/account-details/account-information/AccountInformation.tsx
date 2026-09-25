import type { QueryResult } from '@apollo/client';
import { Link } from '@tanstack/react-router';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { InlineFetchError } from '@/components/ui/composites/fetch-error/FetchError';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { Skeleton } from '@/components/ui/skeleton';
import { useChecksum } from '@/hooks/useChecksum';
import type { AccountResponse } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

import { accountBalanceOrZero } from './account-balance-or-zero';

export interface AccountInformationProps {
  accountId: string;
  query: QueryResult<AccountResponse>;
}

interface AccountDetailsInfo {
  id: string;
  free: string;
  frozen: string;
  reserved: string;
  transactions: number;
  miningRewards: number;
  checksum: string;
  isHighSecurity: boolean;
  isGuardian: boolean;
  isMultisig: boolean;
}

export const AccountInformation: React.FC<AccountInformationProps> = ({
  accountId,
  query
}) => {
  const { data, loading } = query;
  const account = data?.account;

  const {
    checksum,
    loading: checksumLoading,
    error: checksumError
  } = useChecksum(loading, accountId);

  const stats = data?.accountStats;
  const transactions =
    (stats?.total_immediate_transfers ?? 0) +
    (stats?.total_scheduled_transfers ?? 0) +
    (stats?.total_executed_transfers ?? 0) +
    (stats?.total_cancelled_transfers ?? 0);
  const miningRewards = stats?.total_mined_blocks ?? 0;
  const isHighSecurity = (data?.guardian?.aggregate.totalCount ?? 0) > 0;
  const isGuardian = (data?.beneficiaries?.aggregate.totalCount ?? 0) > 0;
  const isMultisig = !!data?.multisig;

  const information: AccountDetailsInfo[] = [
    {
      id: accountId,
      free: accountBalanceOrZero(account?.free),
      frozen: accountBalanceOrZero(account?.frozen),
      reserved: accountBalanceOrZero(account?.reserved),
      transactions,
      miningRewards,
      checksum: checksum ?? '',
      isHighSecurity,
      isGuardian,
      isMultisig
    }
  ];

  return (
    <DataList<AccountDetailsInfo>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Address',
          key: 'id',
          render: (value) => <TextWithCopy text={value} className="break-all" />
        },
        {
          label: 'Check Phrase',
          key: 'checksum',
          render: (value) => {
            if (checksumLoading) return <Skeleton className="h-6" />;
            if (checksumError) {
              return (
                <InlineFetchError
                  error={checksumError}
                  fallbackMessage="Check phrase failed"
                />
              );
            }
            return <TextWithCopy text={value} />;
          }
        },
        {
          label: 'Account type',
          key: 'isHighSecurity',
          render: (_value, item) => {
            const badges: React.ReactNode[] = [];
            if (item.isHighSecurity) {
              badges.push(
                <Badge key="high-sec" variant="immediate">
                  High security beneficiary
                </Badge>
              );
            }
            if (item.isGuardian) {
              badges.push(
                <Badge key="guardian" variant="reversible">
                  Guardian
                </Badge>
              );
            }
            if (item.isMultisig) {
              badges.push(
                <Link
                  key="multisig"
                  to={getMultisigWalletHref(accountId)}
                  className="hover:opacity-80"
                >
                  <Badge variant="miner">Multisig</Badge>
                </Link>
              );
            }
            if (badges.length === 0) {
              return (
                <span className="font-mono text-[11px] text-muted-text">
                  Standard
                </span>
              );
            }
            return (
              <div className="flex flex-wrap items-center gap-1">{badges}</div>
            );
          }
        },
        {
          label: 'Free Balance',
          key: 'free',
          render: (value) => (
            <span className="numeric text-base text-flare">
              {formatMonetaryValue(value)}
            </span>
          ),
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
          label: 'Transactions',
          key: 'transactions',
          render: (value) => (
            <span className="numeric">{value.toLocaleString()}</span>
          )
        },
        {
          label: 'Mining Rewards',
          key: 'miningRewards',
          render: (value) => (
            <span className="numeric">
              {value > 1 ? `${value} rewards` : `${value} reward`}
            </span>
          )
        }
      ]}
    />
  );
};
