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

export interface MultisigProposalCreatedInformationProps {
  hash: string;
}

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
          render: (value) =>
            (value as MultisigProposalCreated['extrinsic'])?.id ? (
              <TextWithCopy
                text={
                  (value as MultisigProposalCreated['extrinsic'])?.id ?? '-'
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
              text={(
                value as MultisigProposalCreated['block']
              ).height.toString()}
              href={`${RESOURCES.blocks}/${(value as MultisigProposalCreated['block']).height}`}
              className="break-all"
            />
          )
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
                href={`${RESOURCES.accounts}/${multisigId}`}
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
            const proposerId = (value as MultisigProposalCreated['proposal'])
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
        }
      ]}
    />
  );
};
