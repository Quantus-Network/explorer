import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigDepositsClaimed } from '@/schemas';
import { formatBlockHeight, formatMonetaryValue } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

export interface MultisigDepositsClaimedInformationProps {
  hash: string;
}

export const MultisigDepositsClaimedInformation: React.FC<
  MultisigDepositsClaimedInformationProps
> = ({ hash }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigDepositsClaimed
    .getByHash()
    .useQuery(hash);

  if (!loading && (!data || data.multisigDepositsClaimedEvents.length !== 1))
    throw notFound();

  const event = data?.multisigDepositsClaimedEvents[0];

  const information: Partial<MultisigDepositsClaimed>[] = [
    {
      timestamp: event?.timestamp,
      block: event?.block,
      extrinsic: event?.extrinsic,
      multisig: event?.multisig,
      claimer: event?.claimer,
      total_returned: event?.total_returned,
      proposals_removed: event?.proposals_removed
    }
  ];

  return (
    <DataList<Partial<MultisigDepositsClaimed>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic Hash',
          key: 'extrinsic',
          render: (value) =>
            (value as MultisigDepositsClaimed['extrinsic'])?.id ? (
              <TextWithCopy
                text={
                  (value as MultisigDepositsClaimed['extrinsic'])?.id ?? '-'
                }
                className="break-all"
              />
            ) : (
              '-'
            )
        },
        {
          label: 'Timestamp',
          key: 'timestamp',
          render: (value) => <TimestampDisplay timestamp={value as string} />
        },
        {
          label: 'Block',
          key: 'block',
          render: (value) => (
            <LinkWithCopy
              text={formatBlockHeight(
                (value as MultisigDepositsClaimed['block']).height
              )}
              href={`${RESOURCES.blocks}/${(value as MultisigDepositsClaimed['block']).height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Multisig',
          key: 'multisig',
          render: (value) => {
            const multisigId = (value as MultisigDepositsClaimed['multisig'])
              ?.id;
            return multisigId ? (
              <LinkWithCopy
                href={getMultisigWalletHref(multisigId)}
                text={multisigId}
                className="break-all"
              />
            ) : (
              '-'
            );
          }
        },
        {
          label: 'Claimer',
          key: 'claimer',
          render: (value) => {
            const claimerId = (value as MultisigDepositsClaimed['claimer'])?.id;
            return claimerId ? (
              <LinkWithCopy
                href={`${RESOURCES.accounts}/${claimerId}`}
                text={claimerId}
                className="break-all"
              />
            ) : (
              '-'
            );
          }
        },
        {
          label: 'Total Returned',
          key: 'total_returned',
          render: (value) => formatMonetaryValue(value)
        },
        {
          label: 'Proposals Removed',
          key: 'proposals_removed',
          render: (value) => (value != null ? String(value) : '-')
        }
      ]}
    />
  );
};
