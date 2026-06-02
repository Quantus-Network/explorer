import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MultisigSignerApproved } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

export interface MultisigSignerApprovedInformationProps {
  id: string;
}

export const MultisigSignerApprovedInformation: React.FC<
  MultisigSignerApprovedInformationProps
> = ({ id }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigSignerApproved.getById().useQuery(id);

  if (!loading && !data?.multisigSignerApproved) throw notFound();

  const event = data?.multisigSignerApproved;

  const information: Partial<MultisigSignerApproved>[] = [
    {
      timestamp: event?.timestamp,
      block: event?.block,
      extrinsic: event?.extrinsic,
      approver: event?.approver,
      approvals_count: event?.approvals_count,
      proposal: event?.proposal
    }
  ];

  return (
    <>
      <h2 className="text-lg font-semibold">Event Information</h2>
      <DataList<Partial<MultisigSignerApproved>>
        loading={loading}
        data={information}
        fields={[
          {
            label: 'Extrinsic Hash',
            key: 'extrinsic',
            render: (value) =>
              (value as MultisigSignerApproved['extrinsic'])?.id ? (
                <TextWithCopy
                  text={
                    (value as MultisigSignerApproved['extrinsic'])?.id ?? '-'
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
                  value as MultisigSignerApproved['block']
                ).height.toString()}
                href={`${RESOURCES.blocks}/${(value as MultisigSignerApproved['block']).height}`}
                className="break-all"
              />
            )
          },
          {
            label: 'Approver',
            key: 'approver',
            render: (value) => {
              const approverId = (value as MultisigSignerApproved['approver'])
                ?.id;
              return approverId ? (
                <LinkWithCopy
                  href={`${RESOURCES.accounts}/${approverId}`}
                  text={approverId}
                />
              ) : (
                '-'
              );
            }
          },
          {
            label: 'Approvals Count',
            key: 'approvals_count',
            render: (value) => (value != null ? String(value) : '-')
          },
          {
            label: 'Proposal ID',
            key: 'proposal',
            render: (value) => {
              const proposal = value as MultisigSignerApproved['proposal'];
              return proposal?.proposal_id != null
                ? String(proposal.proposal_id)
                : '-';
            }
          },
          {
            label: 'Multisig',
            key: 'proposal',
            render: (value) => {
              const multisigId = (value as MultisigSignerApproved['proposal'])
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
              const proposerId = (value as MultisigSignerApproved['proposal'])
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
    </>
  );
};
