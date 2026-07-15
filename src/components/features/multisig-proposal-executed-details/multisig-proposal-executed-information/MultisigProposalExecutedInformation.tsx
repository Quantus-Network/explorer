import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { ProposalIdLink } from '@/components/ui/composites/proposal-id-link/ProposalIdLink';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalExecuted } from '@/schemas';
import { formatBlockHeight } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

export interface MultisigProposalExecutedInformationProps {
  hash: string;
}

const EmptyValue = () => <span className="text-muted-text">—</span>;

export const MultisigProposalExecutedInformation: React.FC<
  MultisigProposalExecutedInformationProps
> = ({ hash }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigProposalExecuted
    .getByHash()
    .useQuery(hash);

  if (!loading && (!data || data.multisigProposalExecutedEvents.length !== 1))
    throw notFound();

  const event = data?.multisigProposalExecutedEvents[0];

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
          render: (value) => {
            const extrinsicId = (value as MultisigProposalExecuted['extrinsic'])
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
            const block = value as
              | MultisigProposalExecuted['block']
              | undefined;
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
              proposal={value as MultisigProposalExecuted['proposal']}
            />
          )
        },
        {
          label: 'Multisig',
          key: 'proposal',
          render: (value) => {
            const multisigId = (value as MultisigProposalExecuted['proposal'])
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
            const proposerId = (value as MultisigProposalExecuted['proposal'])
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
          label: 'Approvers',
          key: 'approvers',
          render: (value) => {
            const approvers = value as string[] | undefined;
            if (!approvers?.length) return <EmptyValue />;
            return (
              <div className="flex flex-col gap-1">
                {approvers.map((approver) => (
                  <LinkWithCopy
                    key={approver}
                    href={`${RESOURCES.accounts}/${approver}`}
                    text={approver}
                    textCopy={approver}
                  />
                ))}
              </div>
            );
          }
        },
        {
          label: 'Result',
          key: 'result',
          render: (value) =>
            value != null ? (
              <span className="font-mono">{String(value)}</span>
            ) : (
              <EmptyValue />
            )
        }
      ]}
    />
  );
};
