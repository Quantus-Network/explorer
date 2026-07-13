import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { HighSecuritySetResponse } from '@/schemas';
import { formatDuration } from '@/utils/formatter';

export interface HighSecuritySetInformationProps {
  hash: string;
}

type HighSecuritySet = HighSecuritySetResponse['highSecuritySets'][0];

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
          render: (value) => (
            <TextWithCopy
              text={(value as HighSecuritySet['extrinsic'])?.id ?? '-'}
              className="break-all"
            />
          )
        },
        {
          label: 'Block',
          key: 'block',
          render: (value) => (
            <LinkWithCopy
              text={(value as HighSecuritySet['block']).height.toString()}
              href={`${RESOURCES.blocks}/${
                (value as HighSecuritySet['block']).height
              }`}
              className="break-all"
            />
          )
        },
        {
          label: 'Timestamp',
          key: 'timestamp',
          render: (value) => <TimestampDisplay timestamp={value as string} />
        },
        {
          label: 'Beneficiary',
          tooltip: 'The account that set the high security feature',
          key: 'who',
          render: (value) => (
            <LinkWithCopy
              text={(value as HighSecuritySet['who']).id}
              href={`${RESOURCES.accounts}/${
                (value as HighSecuritySet['who']).id
              }`}
              className="break-all"
            />
          )
        },
        {
          label: 'Guardian',
          tooltip: 'The entrustee who can intercept the reversible transaction',
          key: 'guardian',
          render: (value) => (
            <LinkWithCopy
              text={(value as HighSecuritySet['guardian']).id}
              href={`${RESOURCES.accounts}/${
                (value as HighSecuritySet['guardian']).id
              }`}
              className="break-all"
            />
          )
        },
        {
          label: 'Reversible Time',
          tooltip:
            'The enforced time period to confirm the reversible transaction',
          key: 'delay',
          render: (value) => formatDuration(value as string | number | bigint)
        }
      ]}
    />
  );
};
