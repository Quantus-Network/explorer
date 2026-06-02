import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalReady } from '@/schemas';
import { formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<MultisigProposalReady>();

export const MULTISIG_PROPOSAL_READY_COLUMNS = [
  columnHelper.accessor('extrinsic.id', {
    id: 'extrinsicHash',
    header: 'Extrinsic Hash',
    cell: (props) => {
      const row = props.row.original;
      return props.getValue() ? (
        <LinkWithCopy
          href={`${RESOURCES.multisigProposalReady}/${row.id}`}
          text={formatTxAddress(props.getValue() ?? '-')}
          textCopy={props.getValue() ?? ''}
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
  columnHelper.accessor('approvals_count', {
    id: 'approvals_count',
    header: 'Approvals Count',
    cell: (props) => props.getValue(),
    enableSorting: true
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
