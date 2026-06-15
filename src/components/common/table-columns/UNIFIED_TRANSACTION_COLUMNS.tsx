import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import { TRANSACTION_TYPE_CONFIG } from '@/constants/transaction-types';
import { cn } from '@/lib/utils';
import type { UnifiedTransaction } from '@/schemas/unified-transaction';
import {
  formatDuration,
  formatMonetaryValue,
  formatTxAddress
} from '@/utils/formatter';
import { getMultisigProposalHref } from '@/utils/get-multisig-proposal-href';

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
        const extrinsicId = extrinsic?.id;

        if (row.type === 'immediate' && extrinsicId) {
          href = `${RESOURCES.transactions}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        } else if (row.type === 'scheduled-reversible' && row.id) {
          href = `${RESOURCES.scheduledReversibleTransactions}/${row.id}`;
          displayText = formatTxAddress(row.id);
        } else if (row.type === 'executed-reversible' && row.id) {
          href = `${RESOURCES.executedReversibleTransactions}/${row.id}`;
          displayText = formatTxAddress(row.id);
        } else if (row.type === 'cancelled-reversible' && row.id) {
          href = `${RESOURCES.cancelledReversibleTransactions}/${row.id}`;
          displayText = formatTxAddress(row.id);
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
        } else if (row.type === 'multisig-created' && extrinsicId) {
          href = `${RESOURCES.multisigCreated}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        } else if (row.type === 'multisig-proposal-created' && extrinsicId) {
          href = `${RESOURCES.multisigProposalCreated}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        } else if (row.type === 'multisig-signer-approved' && extrinsicId) {
          href = `${RESOURCES.multisigSignerApproved}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        } else if (row.type === 'multisig-proposal-ready' && extrinsicId) {
          href = `${RESOURCES.multisigProposalReady}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        } else if (row.type === 'multisig-proposal-executed' && extrinsicId) {
          href = `${RESOURCES.multisigProposalExecuted}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        } else if (row.type === 'multisig-proposal-cancelled' && extrinsicId) {
          href = `${RESOURCES.multisigProposalCancelled}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        } else if (row.type === 'multisig-proposal-removed' && extrinsicId) {
          href = `${RESOURCES.multisigProposalRemoved}/${extrinsicId}`;
          displayText = formatTxAddress(extrinsicId);
        } else if (row.type === 'multisig-deposits-claimed' && extrinsicId) {
          href = `${RESOURCES.multisigDepositsClaimed}/${extrinsicId}`;
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
        if (
          [
            'immediate',
            'scheduled-reversible',
            'executed-reversible',
            'cancelled-reversible'
          ].includes(row.type)
        ) {
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
              {row.guardian && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Guardian:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.guardian.id}`}
                    text={formatTxAddress(row.guardian.id)}
                    textCopy={row.guardian.id}
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

        if (row.type === 'multisig-created') {
          return (
            <div className="flex flex-col gap-1 text-xs">
              {row.creator && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Creator:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.creator.id}`}
                    text={formatTxAddress(row.creator.id)}
                    textCopy={row.creator.id}
                  />
                </div>
              )}
              {row.threshold != null && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Threshold:</span>
                  <span>{row.threshold}</span>
                </div>
              )}
            </div>
          );
        }

        if (
          [
            'multisig-proposal-created',
            'multisig-signer-approved',
            'multisig-proposal-ready',
            'multisig-proposal-executed',
            'multisig-proposal-cancelled',
            'multisig-proposal-removed'
          ].includes(row.type)
        ) {
          return (
            <div className="flex flex-col gap-1 text-xs">
              {row.proposalId && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Proposal:</span>
                  {(() => {
                    const href = getMultisigProposalHref({
                      id: row.proposalId
                    });
                    const text = formatTxAddress(row.proposalId);
                    return href ? (
                      <LinkWithCopy
                        href={href}
                        text={text}
                        textCopy={row.proposalId}
                      />
                    ) : (
                      <span>{text}</span>
                    );
                  })()}
                </div>
              )}
              {row.multisig && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Multisig:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.multisig.id}`}
                    text={formatTxAddress(row.multisig.id)}
                    textCopy={row.multisig.id}
                  />
                </div>
              )}
              {row.approver && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Approver:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.approver.id}`}
                    text={formatTxAddress(row.approver.id)}
                    textCopy={row.approver.id}
                  />
                </div>
              )}
              {row.cancelledBy && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Cancelled by:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.cancelledBy.id}`}
                    text={formatTxAddress(row.cancelledBy.id)}
                    textCopy={row.cancelledBy.id}
                  />
                </div>
              )}
              {row.removedBy && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Removed by:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.removedBy.id}`}
                    text={formatTxAddress(row.removedBy.id)}
                    textCopy={row.removedBy.id}
                  />
                </div>
              )}
              {row.approvalsCount != null && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Approvals:</span>
                  <span>{row.approvalsCount}</span>
                </div>
              )}
              {row.result && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Result:</span>
                  <span>{row.result}</span>
                </div>
              )}
            </div>
          );
        }

        if (row.type === 'multisig-deposits-claimed') {
          return (
            <div className="flex flex-col gap-1 text-xs">
              {row.claimer && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Claimer:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.claimer.id}`}
                    text={formatTxAddress(row.claimer.id)}
                    textCopy={row.claimer.id}
                  />
                </div>
              )}
              {row.multisig && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Multisig:</span>
                  <LinkWithCopy
                    href={`${RESOURCES.accounts}/${row.multisig.id}`}
                    text={formatTxAddress(row.multisig.id)}
                    textCopy={row.multisig.id}
                  />
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
          [
            'immediate',
            'scheduled-reversible',
            'executed-reversible',
            'cancelled-reversible'
          ].includes(row.type) &&
          row.amount !== undefined
        ) {
          return formatMonetaryValue(BigInt(row.amount), 5);
        }

        // For miner rewards
        if (row.type === 'miner-reward' && row.reward !== undefined) {
          return formatMonetaryValue(row.reward, 5);
        }

        // For wormhole
        if (row.type === 'wormhole' && row.totalAmount !== undefined) {
          return formatMonetaryValue(row.totalAmount, 5);
        }

        // For high security sets - show delay
        if (row.type === 'high-security' && row.delay !== undefined) {
          return (
            <span className="text-xs text-muted-foreground">
              {formatDuration(row.delay)}
            </span>
          );
        }

        if (
          row.type === 'multisig-deposits-claimed' &&
          row.totalReturned != null
        ) {
          return formatMonetaryValue(String(row.totalReturned), 5);
        }

        return <span className="text-muted-foreground">-</span>;
      }
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
