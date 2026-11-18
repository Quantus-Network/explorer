import type { QueryResult } from '@apollo/client';
import { Link } from '@tanstack/react-router';
import * as React from 'react';

import {
  AccountAddressLabel,
  AccountTags
} from '@/components/ui/composites/account-address-label/AccountAddressLabel';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { InlineFetchError } from '@/components/ui/composites/fetch-error/FetchError';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { Skeleton } from '@/components/ui/skeleton';
import { useChecksum } from '@/hooks/useChecksum';
import type { AccountResponse } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';
import { knownAddressTags } from '@/utils/known-address-display';

import { accountBalanceOrZero } from './account-balance-or-zero';
import { usePendingInbound } from './use-pending-inbound';

export interface AccountInformationProps {
  accountId: string;
  query: QueryResult<AccountResponse>;
}

interface AccountDetailsInfo {
  id: string;
  tags: readonly string[];
  free: string;
  reserved: string;
  pendingInbound?: bigint;
  transactions: number;
  miningRewards: number;
  checksum: string;
  isHighSecurity: boolean;
  isGuardian: boolean;
  isMultisig: boolean;
  isDepositOnly: boolean | null;
  hasMinedBlocks: boolean;
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

  const pendingInbound = usePendingInbound(accountId);

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
      tags: knownAddressTags(accountId),
      free: accountBalanceOrZero(account?.free),
      reserved: accountBalanceOrZero(account?.reserved),
      pendingInbound: pendingInbound.amount,
      transactions,
      miningRewards,
      checksum: checksum ?? '',
      isHighSecurity,
      isGuardian,
      isMultisig,
      isDepositOnly: account?.is_deposit_only ?? null,
      hasMinedBlocks: account?.has_mined_blocks ?? false
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
            const label = (
              <AccountAddressLabel
                isHighSecurity={item.isHighSecurity}
                isGuardian={item.isGuardian}
                isMultisig={item.isMultisig}
                isDepositOnly={item.isDepositOnly}
                hasMinedBlocks={item.hasMinedBlocks}
              />
            );

            return item.isMultisig ? (
              <Link
                to={getMultisigWalletHref(accountId)}
                className="hover:opacity-80"
              >
                {label}
              </Link>
            ) : (
              label
            );
          }
        },
        {
          label: 'Tags',
          key: 'tags',
          render: (value) =>
            value.length > 0 ? (
              <AccountTags tags={value} />
            ) : (
              <span className="text-muted-text">-</span>
            )
        },
        {
          label: 'Balance',
          key: 'free',
          render: (value) => (
            <span className="numeric text-base text-flare">
              {formatMonetaryValue(value)}
            </span>
          ),
          tooltip: 'The amount of QTC available to spend.'
        },
        {
          label: 'Pending Outbound QTC',
          key: 'reserved',
          render: (value) => formatMonetaryValue(value),
          tooltip:
            'QTC that has been sent but not yet finalized. This may be due to a time lock transaction or other advanced security features enabled on this account. May also include refundable deposits for multisig or governance actions.'
        },
        {
          label: 'Pending Inbound QTC',
          key: 'pendingInbound',
          render: (value) => {
            if (pendingInbound.error) {
              return (
                <InlineFetchError
                  error={pendingInbound.error}
                  fallbackMessage="Pending inbound failed"
                />
              );
            }
            if (value === undefined) return <Skeleton className="h-6" />;
            return formatMonetaryValue(value);
          },
          tooltip:
            "QTC that has been sent to this address but not yet finalized. These funds were likely sent from an address with advanced security features and are not yet available in this account's balance."
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
