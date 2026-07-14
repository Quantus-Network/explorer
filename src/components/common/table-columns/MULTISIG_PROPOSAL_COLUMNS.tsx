import { createColumnHelper } from '@tanstack/react-table';

import { Badge, type BadgeProps } from '@/components/ui/badge';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { MultisigProposal } from '@/schemas';
import {
  formatBlockHeight,
  formatMonetaryValue,
  formatTxAddress
} from '@/utils/formatter';
import { getMultisigProposalHref } from '@/utils/get-multisig-proposal-href';

const columnHelper = createColumnHelper<MultisigProposal>();

const statusBadgeVariant = (
  status: string | null | undefined
): BadgeProps['variant'] => {
  switch (status?.toUpperCase()) {
    case 'SCHEDULED':
      return 'reversible';
    case 'APPROVED':
    case 'READY':
      return 'immediate';
    case 'EXECUTED':
      return 'success';
    case 'CANCELLED':
    case 'REMOVED':
      return 'error';
    default:
      return 'miner';
  }
};

export const MULTISIG_PROPOSAL_COLUMNS = [
  columnHelper.accessor('id', {
    id: 'id',
    header: 'Proposal ID',
    cell: (props) => {
      const proposal = props.row.original;
      const id = props.getValue();
      const href = getMultisigProposalHref(proposal);
      const text = formatTxAddress(id);
      return href ? (
        <LinkWithCopy href={href} text={text} textCopy={id} />
      ) : (
        text
      );
    },
    enableSorting: true
  }),
  columnHelper.accessor('status', {
    id: 'status',
    header: 'Status',
    cell: (props) => {
      const status = props.getValue();
      if (!status) return '-';
      return <Badge variant={statusBadgeVariant(status)}>{status}</Badge>;
    },
    enableSorting: true
  }),
  columnHelper.accessor('multisig.id', {
    id: 'multisig',
    header: 'Wallet',
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
  columnHelper.accessor('proposer.id', {
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
  columnHelper.accessor('approvals', {
    id: 'approvals',
    header: 'Approvers',
    cell: (props) => {
      const approvals = props.getValue();
      if (!approvals?.length) return '0 approvers';
      return `${approvals.length} approver${approvals.length === 1 ? '' : 's'}`;
    },
    enableSorting: false
  }),
  columnHelper.accessor('deposit', {
    id: 'deposit',
    header: 'Deposit',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  }),
  columnHelper.accessor('expiry_block', {
    id: 'expiry_block',
    header: 'Expiry Block',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.blocks}/${props.getValue()}`}
        text={formatBlockHeight(props.getValue())}
      />
    ),
    enableSorting: true
  }),
  columnHelper.accessor('created_at', {
    id: 'created_at',
    header: 'Created',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
