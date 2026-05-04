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

  const information: Partial<ErrorEvent['node']>[] = [
    {
      timestamp: event?.node.timestamp,
      block: event?.node.block,
      extrinsic: event?.node.extrinsic,
      error_type: event?.node.error_type,
      error_module: event?.node.error_module,
      error_name: event?.node.error_name,
      error_docs: event?.node.error_docs
    }
  ];

  return (
    <>
      <h2 className="text-lg font-semibold">Event Information</h2>
      <DataList<Partial<ErrorEvent['node']>>
        loading={loading}
        data={information}
        fields={[
          {
            label: 'Extrinsic Hash',
            key: 'extrinsic',
            render: (value) =>
              (value as ErrorEvent['node']['extrinsic'])?.id ? (
                <TextWithCopy
                  text={(value as ErrorEvent['node']['extrinsic'])?.id ?? '-'}
                  className="break-all"
                />
              ) : (
                '-'
              )
          },
          {
            label: 'Timestamp',
            key: 'timestamp',
            render: (value) => formatTimestamp(value as string, true)
          },
          {
            label: 'Block',
            key: 'block',
            render: (value) => (
              <LinkWithCopy
                text={(value as ErrorEvent['node']['block']).height.toString()}
                href={`${RESOURCES.blocks}/${(value as ErrorEvent['node']['block']).height}`}
                className="break-all"
              />
            )
          },
          {
            label: 'Error Type',
            key: 'error_type'
          },
          {
            label: 'Error Module',
            key: 'error_module',
            render: (value) => (value ? (value as string) : '-')
          },
          {
            label: 'Error Name',
            key: 'error_name',
            render: (value) => (value ? (value as string) : '-')
          },
          {
            label: 'Error Docs',
            key: 'error_docs',
            render: (value) =>
              value ? (
                <TextWithCopy text={value as string} className="break-all" />
              ) : (
                '-'
              )
          }
        ]}
      />
    </>
  );
};
