import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalRemoved } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

export interface MultisigProposalRemovedInformationProps {
  id: string;
}

export const MultisigProposalRemovedInformation: React.FC<
  MultisigProposalRemovedInformationProps
> = ({ id }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigProposalRemoved.getById().useQuery(id);

  if (!loading && !data?.multisigProposalRemoved) throw notFound();

  const event = data?.multisigProposalRemoved;

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
    <>
      <h2 className="text-lg font-semibold">Event Information</h2>
      <DataList<Partial<MultisigProposalRemoved>>
        loading={loading}
        data={information}
        fields={[
          {
            label: 'Extrinsic Hash',
            key: 'extrinsic',
            render: (value) =>
              (value as MultisigProposalRemoved['extrinsic'])?.id ? (
                <TextWithCopy
                  text={
                    (value as MultisigProposalRemoved['extrinsic'])?.id ?? '-'
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
                  value as MultisigProposalRemoved['block']
                ).height.toString()}
                href={`${RESOURCES.blocks}/${(value as MultisigProposalRemoved['block']).height}`}
                className="break-all"
              />
            )
          },
          {
            label: 'Proposal ID',
            key: 'proposal',
            render: (value) => {
              const proposal = value as MultisigProposalRemoved['proposal'];
              return proposal?.proposal_id != null
                ? String(proposal.proposal_id)
                : '-';
            }
          },
          {
            label: 'Multisig',
            key: 'proposal',
            render: (value) => {
              const multisigId = (value as MultisigProposalRemoved['proposal'])
                ?.multisig?.id;
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
            label: 'Proposer',
            key: 'proposal',
            render: (value) => {
              const proposerId = (value as MultisigProposalRemoved['proposal'])
                ?.proposer?.id;
              return proposerId ? (
                <LinkWithCopy
                  href={`${RESOURCES.accounts}/${proposerId}`}
                  text={proposerId}
                />
              ) : (
                '-'
              );
            }
          },
          {
            label: 'Removed By',
            key: 'removedBy',
            render: (value) => {
              const removedById = (
                value as MultisigProposalRemoved['removedBy']
              )?.id;
              return removedById ? (
                <LinkWithCopy
                  href={`${RESOURCES.accounts}/${removedById}`}
                  text={removedById}
                />
              ) : (
                '-'
              );
            }
          }
        ]}
      />
    </>
  );
};
