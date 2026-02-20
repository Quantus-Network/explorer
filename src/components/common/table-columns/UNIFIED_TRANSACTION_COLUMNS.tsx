import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { TransactionStatus } from '@/components/ui/transaction-status';
import { RESOURCES } from '@/constants/resources';
import { TRANSACTION_TYPE_CONFIG } from '@/constants/transaction-types';
import type { UnifiedTransaction } from '@/schemas/unified-transaction';
import {
  formatDuration,
  formatMonetaryValue,
  formatTxAddress
} from '@/utils/formatter';
import { cn } from '@/lib/utils';

const columnHelper = createColumnHelper<UnifiedTransaction>();

export interface UnifiedTransactionColumnsOptions {
  showBlockColumn?: boolean;
}

export const createUnifiedTransactionColumns = (
  options: UnifiedTransactionColumnsOptions = {}
) => {
  const { showBlockColumn = true } = options;

  const columns = [
    // Type column
    columnHelper.accessor('type', {
      id: 'type',
      header: 'Type',
      cell: (props) => {
        const type = props.getValue();
        const config = TRANSACTION_TYPE_CONFIG[type] ?? {
          label: type,
          className: 'bg-gray-100 text-gray-800'
        };
        return (
          <span
            className={cn(
              'rounded px-2 py-1 text-xs font-medium whitespace-nowrap',
              config.className
            )}
          >
            {config.label}
          </span>
        );
      },
      enableSorting: false
    }),

    // Extrinsic column
    columnHelper.accessor('extrinsic', {
      id: 'extrinsic',
      header: 'Extrinsic',
      cell: (props) => {
        const extrinsic = props.getValue();
        const row = props.row.original;

        // Determine link target and display text based on type
        let href = '';
        let displayText = '-';
        let extrinsicId = extrinsic?.id;

        if (row.type === 'immediate' && extrinsicId) {
          href = `${RESOURCES.transactions}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        } else if (row.type === 'reversible' && extrinsicId) {
          href = `${RESOURCES.reversibleTransactions}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        } else if (row.type === 'miner-reward' && row.block) {
          href = `${RESOURCES.blocks}/${row.block.height}`;
          displayText = `Block #${row.block.height}`;
        } else if (row.type === 'high-security') {
          if (extrinsicId) {
            href = `${RESOURCES.highSecuritySets}/${extrinsicId}`;
            displayText = formatTxAddress(extrinsicId);
          } else if (row.block) {
            href = `${RESOURCES.highSecuritySets}`;
            displayText = `Block #${row.block.height}`;
          }
        } else if (row.type === 'wormhole') {
          href = `${RESOURCES.wormhole}/${row.id}`;
          displayText = extrinsicId
            ? formatTxAddress(extrinsicId)
            : formatTxAddress(row.id);
        } else if (row.type === 'error' && extrinsicId) {
          href = `${RESOURCES.errors}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        }

        if (!href) {
          return <span className="text-muted-foreground">-</span>;
        }

        return (
          <LinkWithCopy
            href={href}
            text={displayText}
            textCopy={extrinsicId ?? undefined}
          />
        );
      },
      enableSorting: false
    }),

    // Timestamp column
    columnHelper.accessor('timestamp', {
      id: 'timestamp',
      header: 'Timestamp',
      cell: (props) => {
        const timestamp = props.getValue();
        if (!timestamp) return <span className="text-muted-foreground">-</span>;
        return <TimestampDisplay timestamp={timestamp} />;
      },
      enableSorting: true
    }),

    // Details column (parties, error info, etc.)
    columnHelper.display({
      id: 'details',
      header: 'Details',
      cell: (props) => {
        const row = props.row.original;

        // For transfers (immediate/reversible)
        if (row.type === 'immediate' || row.type === 'reversible') {
          return (
            <div className="flex flex-col gap-1 text-xs">
              {row.from && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">From:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.from.id}`}
                    text={formatTxAddress(row.from.id)}
                    textCopy={row.from.id}
                  />
                </div>
              )}
              {row.to && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">To:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.to.id}`}
                    text={formatTxAddress(row.to.id)}
                    textCopy={row.to.id}
                  />
                </div>
              )}
            </div>
          );
        }

        // For miner rewards
        if (row.type === 'miner-reward' && row.miner) {
          return (
            <div className="flex items-center gap-1 text-xs">
              <span className="text-muted-foreground">Miner:</span>
              <LinkWithCopy
                href={`${RESOURCES.accounts}/${row.miner.id}`}
                text={formatTxAddress(row.miner.id)}
                textCopy={row.miner.id}
              />
            </div>
          );
        }

        // For high security sets
        if (row.type === 'high-security') {
          return (
            <div className="flex flex-col gap-1 text-xs">
              {row.who && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Beneficiary:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.who.id}`}
                    text={formatTxAddress(row.who.id)}
                    textCopy={row.who.id}
                  />
                </div>
              )}
              {row.interceptor && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Guardian:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.interceptor.id}`}
                    text={formatTxAddress(row.interceptor.id)}
                    textCopy={row.interceptor.id}
                  />
                </div>
              )}
            </div>
          );
        }

        // For wormhole - show outputs
        if (row.type === 'wormhole' && row.outputs && row.outputs.length > 0) {
          return (
            <div className="flex flex-col gap-1 text-xs">
              {row.outputs.slice(0, 2).map((output, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="text-muted-foreground">Exit:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${output.exitAccount.id}`}
                    text={formatTxAddress(output.exitAccount.id)}
                    textCopy={output.exitAccount.id}
                  />
                </div>
              ))}
              {row.outputs.length > 2 && (
                <span className="text-muted-foreground">
                  +{row.outputs.length - 2} more
                </span>
              )}
            </div>
          );
        }

        // For error events
        if (row.type === 'error') {
          return (
            <div className="flex flex-col gap-1 text-xs">
              {row.errorType && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{row.errorType}</span>
                </div>
              )}
              {row.errorName && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{row.errorName}</span>
                </div>
              )}
            </div>
          );
        }

        return <span className="text-muted-foreground">-</span>;
      }
    }),

    // Amount column
    columnHelper.display({
      id: 'amount',
      header: 'Amount',
      cell: (props) => {
        const row = props.row.original;

        // For transfers
        if (
          (row.type === 'immediate' || row.type === 'reversible') &&
          row.amount !== undefined
        ) {
          return formatMonetaryValue(Number(row.amount), 5);
        }

        // For miner rewards
        if (row.type === 'miner-reward' && row.reward !== undefined) {
          return formatMonetaryValue(Number(row.reward), 5);
        }

        // For wormhole
        if (row.type === 'wormhole' && row.totalAmount !== undefined) {
          return formatMonetaryValue(Number(row.totalAmount), 5);
        }

        // For high security sets - show delay
        if (row.type === 'high-security' && row.delay !== undefined) {
          return (
            <span className="text-xs text-muted-foreground">
              {formatDuration(row.delay)}
            </span>
          );
        }

        return <span className="text-muted-foreground">-</span>;
      }
    }),

    // Status column
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: (props) => {
        const status = props.getValue();
        if (!status) return <span className="text-muted-foreground">-</span>;
        return <TransactionStatus status={status} />;
      },
      enableSorting: false
    })
  ];

  // Optionally add block column after timestamp
  if (showBlockColumn) {
    const blockColumn = columnHelper.display({
      id: 'block',
      header: 'Block',
      cell: (props) => {
        const height = props.row.original.block?.height;
        if (!height) return <span className="text-muted-foreground">-</span>;
        return (
          <LinkWithCopy
            href={`${RESOURCES.blocks}/${height}`}
            text={height.toString()}
          />
        );
      }
    });

    // Insert block column after timestamp (index 2)
    columns.splice(3, 0, blockColumn);
  }

  return columns;
};

// Default export for backward compatibility
export const UNIFIED_TRANSACTION_COLUMNS = createUnifiedTransactionColumns();
