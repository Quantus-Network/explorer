import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import type { MultisigCreated } from '@/schemas';

import { getMultisigCreatedEventFields } from '../multisig-created-fields';

export interface MultisigCreatedInformationProps {
  hash: string;
}

export const MultisigCreatedInformation: React.FC<
  MultisigCreatedInformationProps
> = ({ hash }) => {
  const api = useApiClient();
  const { data, loading } = api.multisigCreated.getByHash().useQuery(hash);

  if (!loading && (!data || data.multisigCreatedEvents.length !== 1))
    throw notFound();

  const event = data?.multisigCreatedEvents[0];

  const information: Partial<MultisigCreated>[] = [
    {
      id: event?.id,
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
      fields={getMultisigCreatedEventFields()}
    />
  );
};
