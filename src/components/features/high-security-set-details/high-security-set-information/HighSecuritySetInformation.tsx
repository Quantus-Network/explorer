import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { HighSecuritySetResponse } from '@/schemas';
import { formatBlockHeight, formatDuration } from '@/utils/formatter';

export interface HighSecuritySetInformationProps {
  hash: string;
}

type HighSecuritySet = HighSecuritySetResponse['highSecuritySets'][0];

const EmptyValue = () => <span className="text-muted-text">—</span>;

export const HighSecuritySetInformation: React.FC<
  HighSecuritySetInformationProps
> = ({ hash }) => {
  const api = useApiClient();
  const { data, loading } = api.highSecuritySets.getByHash().useQuery(hash);

  if (!loading && (!data || data.highSecuritySets.length !== 1))
    throw notFound();

  const highSecuritySet = data?.highSecuritySets[0];

  const information: Partial<HighSecuritySet>[] = [
    {
      extrinsic: highSecuritySet?.extrinsic,
      block: highSecuritySet?.block,
      timestamp: highSecuritySet?.timestamp,
      who: highSecuritySet?.who,
      guardian: highSecuritySet?.guardian,
      delay: highSecuritySet?.delay
    }
  ];

  return (
    <DataList<Partial<HighSecuritySet>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic',
          key: 'extrinsic',
          render: (value) => {
            const extrinsicId = (value as HighSecuritySet['extrinsic'])?.id;
            return extrinsicId ? (
              <TextWithCopy text={extrinsicId} className="break-all" />
            ) : (
              <EmptyValue />
            );
          }
        },
        {
          label: 'Block',
          key: 'block',
          render: (value) => {
            const block = value as HighSecuritySet['block'] | undefined;
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
          label: 'Beneficiary',
          tooltip: 'The account that set the high security feature',
          key: 'who',
          render: (value) => {
            const whoId = (value as HighSecuritySet['who'])?.id;
            return whoId ? (
              <LinkWithCopy
                text={whoId}
                textCopy={whoId}
                href={`${RESOURCES.accounts}/${whoId}`}
              />
            ) : (
              <EmptyValue />
            );
          }
        },
        {
          label: 'Guardian',
          tooltip: 'The entrustee who can intercept the reversible transaction',
          key: 'guardian',
          render: (value) => {
            const guardianId = (value as HighSecuritySet['guardian'])?.id;
            return guardianId ? (
              <LinkWithCopy
                text={guardianId}
                textCopy={guardianId}
                href={`${RESOURCES.accounts}/${guardianId}`}
              />
            ) : (
              <EmptyValue />
            );
          }
        },
        {
          label: 'Reversible Time',
          tooltip:
            'The enforced time period to confirm the reversible transaction',
          key: 'delay',
          render: (value) =>
            value != null ? (
              <span className="font-mono">
                {formatDuration(value as string | number | bigint)}
              </span>
            ) : (
              <EmptyValue />
            )
        }
      ]}
    />
  );
};
