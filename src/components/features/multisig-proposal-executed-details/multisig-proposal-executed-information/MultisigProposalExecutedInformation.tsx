import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalExecuted } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

export interface MultisigProposalExecutedInformationProps {
  id: string;
}

export const MultisigProposalExecutedInformation: React.FC<
  MultisigProposalExecutedInformationProps
> = ({ id }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigProposalExecuted.getById().useQuery(id);

  if (!loading && !data?.multisigProposalExecuted) throw notFound();

  const event = data?.multisigProposalExecuted;

  const information: Partial<MultisigProposalExecuted>[] = [
    {
      timestamp: event?.timestamp,
      block: event?.block,
      extrinsic: event?.extrinsic,
      proposal: event?.proposal,
      approvers: event?.approvers,
      result: event?.result
    }
  ];

  return (
    <DataList<Partial<MultisigProposalExecuted>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic Hash',
          key: 'extrinsic',
          render: (value) =>
            (value as MultisigProposalExecuted['extrinsic'])?.id ? (
              <TextWithCopy
                text={
                  (value as MultisigProposalExecuted['extrinsic'])?.id ?? '-'
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
                value as MultisigProposalExecuted['block']
              ).height.toString()}
              href={`${RESOURCES.blocks}/${(value as MultisigProposalExecuted['block']).height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Proposal ID',
          key: 'proposal',
          render: (value) => {
            const proposal = value as MultisigProposalExecuted['proposal'];
            return proposal?.proposal_id != null
              ? String(proposal.proposal_id)
              : '-';
          }
        },
        {
          label: 'Multisig',
          key: 'proposal',
          render: (value) => {
            const multisigId = (value as MultisigProposalExecuted['proposal'])
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
            const proposerId = (value as MultisigProposalExecuted['proposal'])
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
          label: 'Approvers',
          key: 'approvers',
          render: (value) => {
            const approvers = value as string[] | undefined;
            if (!approvers?.length) return '-';
            return (
              <div className="flex flex-col gap-1">
                {approvers.map((approver) => (
                  <LinkWithCopy
                    key={approver}
                    href={`${RESOURCES.accounts}/${approver}`}
                    text={approver}
                  />
                ))}
              </div>
            );
          }
        },
        {
          label: 'Result',
          key: 'result',
          render: (value) => (value != null ? String(value) : '-')
        }
      ]}
    />
  );
};
