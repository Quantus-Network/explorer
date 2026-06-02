import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalCancelled } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

export interface MultisigProposalCancelledInformationProps {
  id: string;
}

export const MultisigProposalCancelledInformation: React.FC<
  MultisigProposalCancelledInformationProps
> = ({ id }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigProposalCancelled
    .getById()
    .useQuery(id);

  if (!loading && !data?.multisigProposalCancelled) throw notFound();

  const event = data?.multisigProposalCancelled;

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
          render: (value) => formatTimestamp(value, true)
        },
        {
          label: 'Block',
          key: 'block',
          render: (value) => (
            <LinkWithCopy
              text={(
                value as MultisigProposalCancelled['block']
              ).height.toString()}
              href={`${RESOURCES.blocks}/${(value as MultisigProposalCancelled['block']).height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Proposal ID',
          key: 'proposal',
          render: (value) => {
            const proposal = value as MultisigProposalCancelled['proposal'];
            return proposal?.proposal_id != null
              ? String(proposal.proposal_id)
              : '-';
          }
        },
        {
          label: 'Multisig',
          key: 'proposal',
          render: (value) => {
            const multisigId = (value as MultisigProposalCancelled['proposal'])
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
            const proposerId = (value as MultisigProposalCancelled['proposal'])
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
