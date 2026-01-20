import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { HighSecuritySetResponse } from '@/schemas';
import { formatDuration, formatTimestamp } from '@/utils/formatter';

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
      extrinsicHash: highSecuritySet?.extrinsicHash,
      block: highSecuritySet?.block,
      timestamp: highSecuritySet?.timestamp,
      who: highSecuritySet?.who,
      interceptor: highSecuritySet?.interceptor,
      delay: highSecuritySet?.delay
    }
  ];

  return (
    <DataList<Partial<HighSecuritySet>>
      loading={loading}
      data={information}
      fields={[
        {
          label: 'Extrinsic Hash',
          key: 'extrinsicHash',
          render: (value) => (
            <TextWithCopy text={value as string} className="break-all" />
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
          render: (value) => formatTimestamp(value, true)
        },
        {
          label: 'Who',
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
          label: 'Interceptor',
          key: 'interceptor',
          render: (value) => (
            <LinkWithCopy
              text={(value as HighSecuritySet['interceptor']).id}
              href={`${RESOURCES.accounts}/${
                (value as HighSecuritySet['interceptor']).id
              }`}
              className="break-all"
            />
          )
        },
        {
          label: 'Delay',
          key: 'delay',
          render: (value) => formatDuration(value as string | number | bigint)
        }
      ]}
    />
  );
};
