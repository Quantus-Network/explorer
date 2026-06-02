import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalCreated } from '@/schemas';
import { formatTxAddress } from '@/utils/formatter';

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
        text={props.getValue().toString()}
      />
    ),
    enableSorting: true
  }),

  columnHelper.accessor('proposal.proposal_id', {
    id: 'proposal_id',
    header: 'Proposal ID',
    cell: (props) =>
      props.getValue() != null ? String(props.getValue()) : '-',
    enableSorting: false
  }),
  columnHelper.accessor('proposal.multisig.id', {
    id: 'multisig',
    header: 'Multisig',
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
