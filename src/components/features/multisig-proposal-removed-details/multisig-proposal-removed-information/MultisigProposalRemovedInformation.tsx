import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { ProposalIdLink } from '@/components/ui/composites/proposal-id-link/ProposalIdLink';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalRemoved } from '@/schemas';
import { formatBlockHeight } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

export interface MultisigProposalRemovedInformationProps {
  hash: string;
}

const EmptyValue = () => <span className="text-muted-text">—</span>;

export const MultisigProposalRemovedInformation: React.FC<
  MultisigProposalRemovedInformationProps
> = ({ hash }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigProposalRemoved
    .getByHash()
    .useQuery(hash);

  if (!loading && (!data || data.multisigProposalRemovedEvents.length !== 1))
    throw notFound();

  const event = data?.multisigProposalRemovedEvents[0];

  const information: Partial<MultisigProposalRemoved>[] = [
    {
      timestamp: event?.timestamp,
      block: event?.block,
      extrinsic: event?.extrinsic,
      proposal: event?.proposal,
      removedBy: event?.removedBy
    }
  ];

  return (
    <DataList<Partial<MultisigProposalRemoved>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic Hash',
          key: 'extrinsic',
          render: (value) => {
            const extrinsicId = (value as MultisigProposalRemoved['extrinsic'])
              ?.id;
            return extrinsicId ? (
              <TextWithCopy text={extrinsicId} className="break-all" />
            ) : (
              <EmptyValue />
            );
          }
        },
        {
          label: 'Timestamp',
          key: 'timestamp',
          render: (value) =>
            value ? (
              <TimestampDisplay timestamp={value as string} />
            ) : (
              <EmptyValue />
            )
        },
        {
          label: 'Block',
          key: 'block',
          render: (value) => {
            const block = value as MultisigProposalRemoved['block'] | undefined;
            if (!block) return <EmptyValue />;
            return (
              <LinkWithCopy
                text={formatBlockHeight(block.height)}
                href={`${RESOURCES.blocks}/${block.height}`}
              />
            );
          }
        },
        {
          label: 'Proposal',
          key: 'proposal',
          render: (value) => (
            <ProposalIdLink
              proposal={value as MultisigProposalRemoved['proposal']}
            />
          )
        },
        {
          label: 'Multisig',
          key: 'proposal',
          render: (value) => {
            const multisigId = (value as MultisigProposalRemoved['proposal'])
              ?.multisig?.id;
            return multisigId ? (
              <LinkWithCopy
                href={getMultisigWalletHref(multisigId)}
                text={multisigId}
                textCopy={multisigId}
              />
            ) : (
              <EmptyValue />
            );
          }
        },
        {
          label: 'Proposer',
          key: 'proposal',
          render: (value) => {
            const proposerId = (value as MultisigProposalRemoved['proposal'])
              ?.proposer?.id;
            return proposerId ? (
              <LinkWithCopy
                href={`${RESOURCES.accounts}/${proposerId}`}
                text={proposerId}
                textCopy={proposerId}
              />
            ) : (
              <EmptyValue />
            );
          }
        },
        {
          label: 'Removed By',
          key: 'removedBy',
          render: (value) => {
            const removedById = (value as MultisigProposalRemoved['removedBy'])
              ?.id;
            return removedById ? (
              <LinkWithCopy
                href={`${RESOURCES.accounts}/${removedById}`}
                text={removedById}
                textCopy={removedById}
              />
            ) : (
              <EmptyValue />
            );
          }
        }
      ]}
    />
  );
};
