import * as React from 'react';

import { getMultisigAccountFields } from '@/components/features/multisig-created-details/multisig-created-fields';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import type { MultisigCreated } from '@/schemas';

export interface AccountMultisigInformationProps {
  multisig: MultisigCreated;
  loading?: boolean;
}

export const AccountMultisigInformation: React.FC<
  AccountMultisigInformationProps
> = ({ multisig, loading = false }) => {
  const information: Partial<MultisigCreated>[] = [
    {
      id: multisig.id,
      timestamp: multisig.timestamp,
      block: multisig.block,
      extrinsic: multisig.extrinsic,
      creator: multisig.creator,
      threshold: multisig.threshold,
      nonce: multisig.nonce,
      signers: multisig.signers
    }
  ];

  return (
    <>
      <h2 className="text-lg font-semibold">Multisig Details</h2>
      <DataList<Partial<MultisigCreated>>
        loading={loading}
        data={information}
        fields={getMultisigAccountFields()}
      />
    </>
  );
};
