import * as React from 'react';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigCreated } from '@/schemas';
import { formatBlockHeight } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

type MultisigCreatedField = {
  label: string;
  key: keyof MultisigCreated;
  tooltip?: string;
  render?: (value: unknown, item: Partial<MultisigCreated>) => React.ReactNode;
};

const EmptyValue = () => <span className="text-muted-text">—</span>;

const getSharedMultisigConfigurationFields = (): MultisigCreatedField[] => [
  {
    label: 'Threshold',
    key: 'threshold',
    render: (value) =>
      value != null ? (
        <span className="font-mono">{String(value)}</span>
      ) : (
        <EmptyValue />
      )
  },
  {
    label: 'Nonce',
    key: 'nonce',
    render: (value) =>
      value != null ? (
        <span className="font-mono">{String(value)}</span>
      ) : (
        <EmptyValue />
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
          textCopy={creatorId}
        />
      ) : (
        <EmptyValue />
      );
    }
  },
  {
    label: 'Signers',
    key: 'signers',
    render: (value) => {
      const signers = value as string[] | undefined;
      if (!signers?.length) return <EmptyValue />;
      return (
        <div className="flex flex-col gap-1">
          {signers.map((signer) => (
            <LinkWithCopy
              key={signer}
              href={`${RESOURCES.accounts}/${signer}`}
              text={signer}
              textCopy={signer}
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
    render: (value) => {
      const extrinsicId = (value as MultisigCreated['extrinsic'])?.id;
      return extrinsicId ? (
        <TextWithCopy text={extrinsicId} className="break-all" />
      ) : (
        <EmptyValue />
      );
    }
  },
  {
    label: 'Timestamp',
    key: 'timestamp',
    render: (value) =>
      value ? <TimestampDisplay timestamp={value as string} /> : <EmptyValue />
  },
  {
    label: 'Block',
    key: 'block',
    render: (value) => {
      const block = value as MultisigCreated['block'] | undefined;
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
    label: 'Multisig',
    key: 'id',
    render: (value) =>
      value ? (
        <LinkWithCopy
          href={getMultisigWalletHref(String(value))}
          text={String(value)}
          textCopy={String(value)}
        />
      ) : (
        <EmptyValue />
      )
  },
  ...getSharedMultisigConfigurationFields()
];

export const getMultisigAccountFields = (): MultisigCreatedField[] => [
  {
    label: 'Address',
    key: 'id',
    render: (value) =>
      value ? (
        <TextWithCopy text={String(value)} className="break-all" />
      ) : (
        <EmptyValue />
      )
  },
  ...getSharedMultisigConfigurationFields(),
  {
    label: 'Created At',
    key: 'timestamp',
    render: (value) =>
      value ? <TimestampDisplay timestamp={value as string} /> : <EmptyValue />
  },
  {
    label: 'Block',
    key: 'block',
    render: (value) => {
      const block = value as MultisigCreated['block'] | undefined;
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
    label: 'Creation Event',
    key: 'id',
    render: (_value, item) =>
      item.extrinsic?.id ? (
        <LinkWithCopy
          href={`${RESOURCES.multisigCreated}/${item.extrinsic.id}`}
          text="View creation event"
        />
      ) : (
        <EmptyValue />
      )
  }
];
