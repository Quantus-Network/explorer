import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigCreated } from '@/schemas';
import { formatBlockHeight, formatTxAddress } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

const columnHelper = createColumnHelper<MultisigCreated>();

export const MULTISIG_CREATED_COLUMNS = [
  columnHelper.accessor('id', {
    id: 'wallet',
    header: 'Wallet',
    cell: (props) => {
      const walletId = props.getValue();
      return walletId ? (
        <LinkWithCopy
          href={getMultisigWalletHref(walletId)}
          text={formatTxAddress(walletId)}
          textCopy={walletId}
        />
      ) : (
        '-'
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('extrinsic.id', {
    id: 'extrinsicHash',
    header: 'Hash',
    cell: (props) => {
      const extrinsicId = props.getValue();
      return extrinsicId ? (
        <LinkWithCopy
          href={`${RESOURCES.multisigCreated}/${extrinsicId}`}
          text={formatTxAddress(extrinsicId)}
          textCopy={extrinsicId}
        />
      ) : (
        'Is not available'
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('block.height', {
    id: 'block_height',
    header: 'Block',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.blocks}/${props.getValue()}`}
        text={formatBlockHeight(props.getValue())}
      />
    ),
    enableSorting: true
  }),
  columnHelper.accessor('creator.id', {
    id: 'creator',
    header: 'Creator',
    cell: (props) =>
      props.getValue() ? (
        <LinkWithCopy
          href={`${RESOURCES.accounts}/${props.getValue()}`}
          text={formatTxAddress(props.getValue() ?? '-')}
          textCopy={props.getValue() ?? ''}
        />
      ) : (
        '-'
      ),
    enableSorting: false
  }),
  columnHelper.accessor('threshold', {
    id: 'threshold',
    header: 'Threshold',
    cell: (props) => props.getValue(),
    enableSorting: true
  }),
  columnHelper.accessor('signers', {
    id: 'signers',
    header: 'Signers',
    cell: (props) => {
      const signers = props.getValue();
      if (!signers?.length) return '-';
      return `${signers.length} signer${signers.length === 1 ? '' : 's'}`;
    },
    enableSorting: false
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Created',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
