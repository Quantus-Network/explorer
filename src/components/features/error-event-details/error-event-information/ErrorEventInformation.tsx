import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { ErrorEvent } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

export interface ErrorEventInformationProps {
  id: string;
}

export const ErrorEventInformation: React.FC<ErrorEventInformationProps> = ({
  id
}) => {
  const api = useApiClient();
  const { data, loading } = api.errors.getByHash().useQuery(id);

  if (!loading && (!data || data.errorEvents.length <= 0)) throw notFound();

  const event = data?.errorEvents[0];

  const information: Partial<ErrorEvent>[] = [
    {
      timestamp: event?.timestamp,
      block: event?.block,
      extrinsicHash: event?.extrinsicHash,
      errorType: event?.errorType,
      errorModule: event?.errorModule,
      errorName: event?.errorName,
      errorDocs: event?.errorDocs
    }
  ];

  return (
    <DataList<Partial<ErrorEvent>>
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
          label: 'Timestamp',
          key: 'timestamp',
          render: (value) => formatTimestamp(value, true)
        },
        {
          label: 'Block',
          key: 'block',
          render: (value) => (
            <LinkWithCopy
              text={(value as ErrorEvent['block']).height.toString()}
              href={`${RESOURCES.blocks}/${(value as ErrorEvent['block']).height}`}
              className="break-all"
            />
          )
        },
        {
          label: 'Error Type',
          key: 'errorType'
        },
        {
          label: 'Error Module',
          key: 'errorModule',
          render: (value) => (value ? (value as string) : '-')
        },
        {
          label: 'Error Name',
          key: 'errorName',
          render: (value) => (value ? (value as string) : '-')
        },
        {
          label: 'Error Docs',
          key: 'errorDocs',
          render: (value) =>
            value ? (
              <TextWithCopy text={value as string} className="break-all" />
            ) : (
              '-'
            )
        }
      ]}
    />
  );
};
