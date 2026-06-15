import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { ProposalIdLink } from '@/components/ui/composites/proposal-id-link/ProposalIdLink';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MultisigSignerApproved } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

export interface MultisigSignerApprovedInformationProps {
  hash: string;
}

export const MultisigSignerApprovedInformation: React.FC<
  MultisigSignerApprovedInformationProps
> = ({ hash }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigSignerApproved
    .getByHash()
    .useQuery(hash);

  if (!loading && (!data || data.multisigSignerApprovedEvents.length !== 1))
    throw notFound();

  const event = data?.multisigSignerApprovedEvents[0];

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
                text={(value as MultisigSignerApproved['extrinsic'])?.id ?? '-'}
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
                className="break-all"
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
          label: 'Proposal',
          key: 'proposal',
          render: (value) => (
            <ProposalIdLink
              proposal={value as MultisigSignerApproved['proposal']}
            />
          )
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
            const proposerId = (value as MultisigSignerApproved['proposal'])
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
