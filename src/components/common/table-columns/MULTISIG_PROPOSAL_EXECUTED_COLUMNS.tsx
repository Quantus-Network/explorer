import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposalExecuted } from '@/schemas';
import { formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<MultisigProposalExecuted>();

export const MULTISIG_PROPOSAL_EXECUTED_COLUMNS = [
  columnHelper.accessor('extrinsic.id', {
    id: 'extrinsicHash',
    header: 'Extrinsic Hash',
    cell: (props) => {
      const row = props.row.original;
      return props.getValue() ? (
        <LinkWithCopy
          href={`${RESOURCES.multisigProposalExecuted}/${row.id}`}
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
  columnHelper.accessor('approvers', {
    id: 'approvers_count',
    header: 'Approvers',
    cell: (props) => {
      const approvers = props.getValue();
      if (!approvers?.length) return '-';
      return `${approvers.length} approver${approvers.length === 1 ? '' : 's'}`;
    },
    enableSorting: false
  }),
  columnHelper.accessor('result', {
    id: 'result',
    header: 'Result',
    cell: (props) => props.getValue() ?? '-',
    enableSorting: false
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
