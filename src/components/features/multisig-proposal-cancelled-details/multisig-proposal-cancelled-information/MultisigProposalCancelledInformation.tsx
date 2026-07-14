import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { ProposalIdLink } from '@/components/ui/composites/proposal-id-link/ProposalIdLink';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalCancelled } from '@/schemas';
import { formatBlockHeight } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

export interface MultisigProposalCancelledInformationProps {
  hash: string;
}

export const MultisigProposalCancelledInformation: React.FC<
  MultisigProposalCancelledInformationProps
> = ({ hash }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigProposalCancelled
    .getByHash()
    .useQuery(hash);

  if (!loading && (!data || data.multisigProposalCancelledEvents.length !== 1))
    throw notFound();

  const event = data?.multisigProposalCancelledEvents[0];

  const information: Partial<MultisigProposalCancelled>[] = [
    {
      timestamp: event?.timestamp,
      block: event?.block,
      extrinsic: event?.extrinsic,
      proposal: event?.proposal,
      cancelledBy: event?.cancelledBy
    }
  ];

  return (
    <DataList<Partial<MultisigProposalCancelled>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic Hash',
          key: 'extrinsic',
          render: (value) =>
            (value as MultisigProposalCancelled['extrinsic'])?.id ? (
              <TextWithCopy
                text={
                  (value as MultisigProposalCancelled['extrinsic'])?.id ?? '-'
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
                (value as MultisigProposalCancelled['block']).height
              )}
              href={`${RESOURCES.blocks}/${(value as MultisigProposalCancelled['block']).height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Proposal',
          key: 'proposal',
          render: (value) => (
            <ProposalIdLink
              proposal={value as MultisigProposalCancelled['proposal']}
            />
          )
        },
        {
          label: 'Multisig',
          key: 'proposal',
          render: (value) => {
            const multisigId = (value as MultisigProposalCancelled['proposal'])
              ?.multisig?.id;
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
          label: 'Proposer',
          key: 'proposal',
          render: (value) => {
            const proposerId = (value as MultisigProposalCancelled['proposal'])
              ?.proposer?.id;
            return proposerId ? (
              <LinkWithCopy
                href={`${RESOURCES.accounts}/${proposerId}`}
                text={proposerId}
                className="break-all"
              />
            ) : (
              '-'
            );
          }
        },
        {
          label: 'Cancelled By',
          key: 'cancelledBy',
          render: (value) => {
            const cancelledById = (
              value as MultisigProposalCancelled['cancelledBy']
            )?.id;
            return cancelledById ? (
              <LinkWithCopy
                href={`${RESOURCES.accounts}/${cancelledById}`}
                text={cancelledById}
                className="break-all"
              />
            ) : (
              '-'
            );
          }
        }
      ]}
    />
  );
};
