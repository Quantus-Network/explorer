import type { QueryResult } from '@apollo/client';
import * as React from 'react';

import { getMultisigAccountFields } from '@/components/features/multisig-created-details/multisig-created-fields';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import type { MultisigByIdResponse, MultisigCreated } from '@/schemas';

export interface MultisigInformationProps {
  query: QueryResult<MultisigByIdResponse>;
}

export const MultisigInformation: React.FC<MultisigInformationProps> = ({
  query
}) => {
  const { data, loading } = query;
  const multisig = data?.multisig;

  const information: Partial<MultisigCreated>[] = [
    {
      id: multisig?.id,
      timestamp: multisig?.timestamp,
      block: multisig?.block,
      extrinsic: multisig?.extrinsic,
      creator: multisig?.creator,
      threshold: multisig?.threshold,
      nonce: multisig?.nonce,
      signers: multisig?.signers
    }
  ];

  return (
    <DataList<Partial<MultisigCreated>>
      loading={loading}
      data={information}
      fields={getMultisigAccountFields()}
    />
  );
};
