import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { ProposalIdLink } from '@/components/ui/composites/proposal-id-link/ProposalIdLink';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalCreated } from '@/schemas';
import { formatBlockHeight } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

export interface MultisigProposalCreatedInformationProps {
  hash: string;
}

const EmptyValue = () => <span className="text-muted-text">—</span>;

export const MultisigProposalCreatedInformation: React.FC<
  MultisigProposalCreatedInformationProps
> = ({ hash }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigProposalCreated
    .getByHash()
    .useQuery(hash);

  if (!loading && (!data || data.multisigProposalCreatedEvents.length !== 1))
    throw notFound();

  const event = data?.multisigProposalCreatedEvents[0];

  const information: Partial<MultisigProposalCreated>[] = [
    {
      timestamp: event?.timestamp,
      block: event?.block,
      extrinsic: event?.extrinsic,
      proposal: event?.proposal
    }
  ];

  return (
    <DataList<Partial<MultisigProposalCreated>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic Hash',
          key: 'extrinsic',
          render: (value) => {
            const extrinsicId = (value as MultisigProposalCreated['extrinsic'])
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
            const block = value as MultisigProposalCreated['block'] | undefined;
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
              proposal={value as MultisigProposalCreated['proposal']}
            />
          )
        },
        {
          label: 'Multisig',
          key: 'proposal',
          render: (value) => {
            const multisigId = (value as MultisigProposalCreated['proposal'])
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
            const proposerId = (value as MultisigProposalCreated['proposal'])
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
        }
      ]}
    />
  );
};
