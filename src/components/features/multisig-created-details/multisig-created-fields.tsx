import * as React from 'react';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { MultisigCreated } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

type MultisigCreatedField = {
  label: string;
  key: keyof MultisigCreated;
  tooltip?: string;
  render?: (value: unknown, item: Partial<MultisigCreated>) => React.ReactNode;
};

const getSharedMultisigConfigurationFields = (): MultisigCreatedField[] => [
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
    label: 'Creator',
    key: 'creator',
    render: (value) => {
      const creatorId = (value as MultisigCreated['creator'])?.id;
      return creatorId ? (
        <LinkWithCopy
          href={`${RESOURCES.accounts}/${creatorId}`}
          text={creatorId}
          textCopy={creatorId}
          className="break-all"
        />
      ) : (
        '-'
      );
    }
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
              textCopy={signer}
              className="break-all"
            />
          ))}
        </div>
      );
    }
  }
];

export const getMultisigCreatedEventFields = (): MultisigCreatedField[] => [
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
    render: (value) => formatTimestamp(value as string, true)
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
  ...getSharedMultisigConfigurationFields()
];

export const getMultisigAccountFields = (): MultisigCreatedField[] => [
  ...getSharedMultisigConfigurationFields(),
  {
    label: 'Created At',
    key: 'timestamp',
    render: (value) => formatTimestamp(value as string, true)
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
    label: 'Creation Event',
    key: 'id',
    render: (_value, item) =>
      item.extrinsic?.id ? (
        <LinkWithCopy
          href={`${RESOURCES.multisigCreated}/${item.extrinsic.id}`}
          text="View creation event"
        />
      ) : (
        '-'
      )
  }
];
