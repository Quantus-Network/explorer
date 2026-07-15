import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { ProposalIdLink } from '@/components/ui/composites/proposal-id-link/ProposalIdLink';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalReady } from '@/schemas';
import { formatBlockHeight } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

export interface MultisigProposalReadyInformationProps {
  hash: string;
}

const EmptyValue = () => <span className="text-muted-text">—</span>;

export const MultisigProposalReadyInformation: React.FC<
  MultisigProposalReadyInformationProps
> = ({ hash }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigProposalReady
    .getByHash()
    .useQuery(hash);

  if (!loading && (!data || data.multisigProposalReadyEvents.length !== 1))
    throw notFound();

  const event = data?.multisigProposalReadyEvents[0];

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
          render: (value) => {
            const extrinsicId = (value as MultisigProposalReady['extrinsic'])
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
            const block = value as MultisigProposalReady['block'] | undefined;
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
              proposal={value as MultisigProposalReady['proposal']}
            />
          )
        },
        {
          label: 'Approvals Count',
          key: 'approvals_count',
          render: (value) =>
            value != null ? (
              <span className="font-mono">{String(value)}</span>
            ) : (
              <EmptyValue />
            )
        },
        {
          label: 'Multisig',
          key: 'proposal',
          render: (value) => {
            const multisigId = (value as MultisigProposalReady['proposal'])
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
            const proposerId = (value as MultisigProposalReady['proposal'])
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
