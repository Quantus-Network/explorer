import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MultisigCreated } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

export interface MultisigCreatedInformationProps {
  id: string;
}

export const MultisigCreatedInformation: React.FC<
  MultisigCreatedInformationProps
> = ({ id }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigCreated.getById().useQuery(id);

  if (!loading && !data?.multisigCreated) throw notFound();

  const event = data?.multisigCreated;

  const information: Partial<MultisigCreated>[] = [
    {
      timestamp: event?.timestamp,
      block: event?.block,
      extrinsic: event?.extrinsic,
      creator: event?.creator,
      threshold: event?.threshold,
      nonce: event?.nonce,
      signers: event?.signers
    }
  ];

  return (
    <DataList<Partial<MultisigCreated>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic Hash',
          key: 'extrinsic',
          render: (value) =>
            (value as MultisigCreated['extrinsic'])?.id ? (
              <TextWithCopy
                text={(value as MultisigCreated['extrinsic'])?.id ?? '-'}
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
              text={(value as MultisigCreated['block']).height.toString()}
              href={`${RESOURCES.blocks}/${(value as MultisigCreated['block']).height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Creator',
          key: 'creator',
          render: (value) => {
            const creatorId = (value as MultisigCreated['creator'])?.id;
            return creatorId ? (
              <LinkWithCopy
                href={`${RESOURCES.accounts}/${creatorId}`}
                text={creatorId}
              />
            ) : (
              '-'
            );
          }
        },
        {
          label: 'Threshold',
          key: 'threshold',
          render: (value) => (value != null ? String(value) : '-')
        },
        {
          label: 'Nonce',
          key: 'nonce',
          render: (value) => (value != null ? String(value) : '-')
        },
        {
          label: 'Signers',
          key: 'signers',
          render: (value) => {
            const signers = value as string[] | undefined;
            if (!signers?.length) return '-';
            return (
              <div className="flex flex-col gap-1">
                {signers.map((signer) => (
                  <LinkWithCopy
                    key={signer}
                    href={`${RESOURCES.accounts}/${signer}`}
                    text={signer}
                  />
                ))}
              </div>
            );
          }
        }
      ]}
    />
  );
};
