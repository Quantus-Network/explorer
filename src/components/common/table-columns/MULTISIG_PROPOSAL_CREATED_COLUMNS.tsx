import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { ProposalIdLink } from '@/components/ui/composites/proposal-id-link/ProposalIdLink';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalCreated } from '@/schemas';
import { formatBlockHeight, formatTxAddress } from '@/utils/formatter';
import { getMultisigWalletHref } from '@/utils/get-multisig-wallet-href';

const columnHelper = createColumnHelper<MultisigProposalCreated>();

export const MULTISIG_PROPOSAL_CREATED_COLUMNS = [
  columnHelper.accessor('extrinsic.id', {
    id: 'extrinsicHash',
    header: 'Extrinsic Hash',
    cell: (props) => {
      const extrinsicId = props.getValue();
      return extrinsicId ? (
        <LinkWithCopy
          href={`${RESOURCES.multisigProposalCreated}/${extrinsicId}`}
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

  columnHelper.accessor('proposal.id', {
    id: 'proposal',
    header: 'Proposal',
    cell: (props) => <ProposalIdLink proposal={props.row.original.proposal} />,
    enableSorting: false
  }),
  columnHelper.accessor('proposal.multisig.id', {
    id: 'multisig',
    header: 'Multisig',
    cell: (props) =>
      props.getValue() ? (
        <LinkWithCopy
          href={getMultisigWalletHref(props.getValue() ?? '')}
          text={formatTxAddress(props.getValue() ?? '-')}
          textCopy={props.getValue() ?? ''}
        />
      ) : (
        '-'
      ),
    enableSorting: false
  }),
  columnHelper.accessor('proposal.proposer.id', {
    id: 'proposer',
    header: 'Proposer',
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
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
