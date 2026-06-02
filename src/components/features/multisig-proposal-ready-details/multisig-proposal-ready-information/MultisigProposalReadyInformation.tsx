import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalReady } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

export interface MultisigProposalReadyInformationProps {
  id: string;
}

export const MultisigProposalReadyInformation: React.FC<
  MultisigProposalReadyInformationProps
> = ({ id }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigProposalReady.getById().useQuery(id);

  if (!loading && !data?.multisigProposalReady) throw notFound();

  const event = data?.multisigProposalReady;

  const information: Partial<MultisigProposalReady>[] = [
    {
      timestamp: event?.timestamp,
      block: event?.block,
      extrinsic: event?.extrinsic,
      approvals_count: event?.approvals_count,
      proposal: event?.proposal
    }
  ];

  return (
    <DataList<Partial<MultisigProposalReady>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic Hash',
          key: 'extrinsic',
          render: (value) =>
            (value as MultisigProposalReady['extrinsic'])?.id ? (
              <TextWithCopy
                text={(value as MultisigProposalReady['extrinsic'])?.id ?? '-'}
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
              text={(value as MultisigProposalReady['block']).height.toString()}
              href={`${RESOURCES.blocks}/${(value as MultisigProposalReady['block']).height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Proposal ID',
          key: 'proposal',
          render: (value) => {
            const proposal = value as MultisigProposalReady['proposal'];
            return proposal?.proposal_id != null
              ? String(proposal.proposal_id)
              : '-';
          }
        },
        {
          label: 'Approvals Count',
          key: 'approvals_count',
          render: (value) => (value != null ? String(value) : '-')
        },
        {
          label: 'Multisig',
          key: 'proposal',
          render: (value) => {
            const multisigId = (value as MultisigProposalReady['proposal'])
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
            const proposerId = (value as MultisigProposalReady['proposal'])
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
        }
      ]}
    />
  );
};
