import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { ProposalIdLink } from '@/components/ui/composites/proposal-id-link/ProposalIdLink';
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
      const extrinsicId = props.getValue();
      return extrinsicId ? (
        <LinkWithCopy
          href={`${RESOURCES.multisigProposalExecuted}/${extrinsicId}`}
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
  columnHelper.accessor('proposal.id', {
    id: 'proposal',
    header: 'Proposal',
    cell: (props) => <ProposalIdLink proposal={props.row.original.proposal} />,
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
