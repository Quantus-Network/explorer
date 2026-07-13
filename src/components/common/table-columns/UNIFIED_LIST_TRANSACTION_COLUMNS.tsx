import { createColumnHelper } from '@tanstack/react-table';
import type { VariantProps } from 'class-variance-authority';

import { Badge, type badgeVariants } from '@/components/ui/badge';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type {
  UnifiedListTransaction,
  UnifiedListTransactionStatus
} from '@/schemas';
import { formatMonetaryValue, formatTxAddress } from '@/utils/formatter';
import { getUnifiedTransactionDetailPath } from '@/utils/get-unified-transaction-detail-path';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

const STATUS_BADGE: Record<
  UnifiedListTransactionStatus,
  { label: string; variant: BadgeVariant }
> = {
  SUCCESS: { label: 'Success', variant: 'success' },
  ERROR: { label: 'Error', variant: 'error' },
  SCHEDULED: { label: 'Scheduled', variant: 'reversible' },
  EXECUTED: { label: 'Executed', variant: 'success' },
  CANCELLED: { label: 'Cancelled', variant: 'error' }
};

const columnHelper = createColumnHelper<UnifiedListTransaction>();

export const UNIFIED_LIST_TRANSACTION_COLUMNS = [
  columnHelper.accessor((row) => row.hash ?? row.detail_id, {
    id: 'hash',
    header: 'Hash / ID',
    cell: (props) => {
      const row = props.row.original;
      const display = row.hash ?? row.detail_id;
      return (
        <LinkWithCopy
          href={getUnifiedTransactionDetailPath({
            type: row.type,
            hash: row.hash,
            detailId: row.detail_id,
            block: row.block
          })}
          text={formatTxAddress(display)}
          textCopy={display}
        />
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
        text={props.getValue().toLocaleString()}
        className="font-mono text-flare"
      />
    ),
    enableSorting: true
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Time',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  }),
  columnHelper.accessor((row) => row.from?.id, {
    id: 'from',
    header: 'From',
    cell: (props) => {
      const id = props.getValue();
      if (!id) return <span className="font-mono text-muted-text">—</span>;
      return (
        <LinkWithCopy
          href={`${RESOURCES.accounts}/${id}`}
          text={formatTxAddress(id)}
          textCopy={id}
          className="font-mono text-muted-text"
        />
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor((row) => row.to?.id, {
    id: 'to',
    header: 'To',
    cell: (props) => {
      const id = props.getValue();
      if (!id) return <span className="font-mono text-muted-text">—</span>;
      return (
        <LinkWithCopy
          href={`${RESOURCES.accounts}/${id}`}
          text={formatTxAddress(id)}
          textCopy={id}
          className="font-mono text-muted-text"
        />
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    header: 'Amount',
    cell: (props) => {
      const value = props.getValue();
      if (value == null)
        return <span className="font-mono text-muted-text">—</span>;
      return <span className="font-mono">{formatMonetaryValue(value, 5)}</span>;
    },
    enableSorting: true
  }),
  columnHelper.accessor('fee', {
    id: 'fee',
    header: 'Fee',
    cell: (props) => {
      const value = props.getValue();
      if (value == null)
        return <span className="font-mono text-muted-text">—</span>;
      return (
        <span className="font-mono text-muted-text">
          {formatMonetaryValue(value, 5)}
        </span>
      );
    },
    enableSorting: true
  }),
  columnHelper.accessor('status', {
    id: 'status',
    header: 'Status',
    cell: (props) => {
      const status = props.getValue();
      const config = STATUS_BADGE[status] ?? {
        label: status,
        variant: 'miner' as const
      };
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
    enableSorting: false
  })
];

/** Compact columns for landing recent transactions */
export const RECENT_UNIFIED_LIST_TRANSACTION_COLUMNS = [
  columnHelper.accessor((row) => row.hash ?? row.detail_id, {
    id: 'hash',
    header: 'Hash / ID',
    cell: (props) => {
      const row = props.row.original;
      const display = row.hash ?? row.detail_id;
      return (
        <LinkWithCopy
          href={getUnifiedTransactionDetailPath({
            type: row.type,
            hash: row.hash,
            detailId: row.detail_id,
            block: row.block
          })}
          text={formatTxAddress(display)}
          textCopy={display}
        />
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('amount', {
    id: 'amount',
    header: 'Amount',
    cell: (props) => {
      const value = props.getValue();
      if (value == null)
        return <span className="font-mono text-muted-text">—</span>;
      return <span className="font-mono">{formatMonetaryValue(value, 5)}</span>;
    },
    enableSorting: false
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Time',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: false
  })
];
