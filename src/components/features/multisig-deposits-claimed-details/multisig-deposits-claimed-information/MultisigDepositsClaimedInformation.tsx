import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MultisigDepositsClaimed } from '@/schemas';
import { formatMonetaryValue, formatTimestamp } from '@/utils/formatter';

export interface MultisigDepositsClaimedInformationProps {
  id: string;
}

export const MultisigDepositsClaimedInformation: React.FC<
  MultisigDepositsClaimedInformationProps
> = ({ id }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigDepositsClaimed.getById().useQuery(id);

  if (!loading && !data?.multisigDepositsClaimed) throw notFound();

  const event = data?.multisigDepositsClaimed;

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
          render: (value) => formatTimestamp(value, true)
        },
        {
          label: 'Block',
          key: 'block',
          render: (value) => (
            <LinkWithCopy
              text={(
                value as MultisigDepositsClaimed['block']
              ).height.toString()}
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
                href={`${RESOURCES.accounts}/${multisigId}`}
                text={multisigId}
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
