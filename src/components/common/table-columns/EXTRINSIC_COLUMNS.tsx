import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { BlockExtrinsic } from '@/schemas/blocks';
import { formatMonetaryValue, formatTxAddress } from '@/utils/formatter';
import { cn } from '@/lib/utils';

const columnHelper = createColumnHelper<BlockExtrinsic>();

export const createExtrinsicColumns = () => {
  const columns = [
    // Index column
    columnHelper.accessor('indexInBlock', {
      id: 'index',
      header: '#',
      cell: (props) => props.getValue(),
      enableSorting: false
    }),

    // Extrinsic Hash column
    columnHelper.accessor('id', {
      id: 'extrinsic',
      header: 'Extrinsic',
      cell: (props) => {
        const hash = props.getValue();
        const pallet = props.row.original.pallet;

        // Determine the appropriate resource based on pallet
        let href = '';
        if (pallet === 'Wormhole') {
          href = `${RESOURCES.wormhole}/${hash}`;
        } else if (pallet === 'Balances') {
          href = `${RESOURCES.transactions}/${hash}`;
        } else if (pallet === 'ReversibleTransfers') {
          href = `${RESOURCES.reversibleTransactions}/${hash}`;
        } else {
          // Default to transactions for now
          href = `${RESOURCES.transactions}/${hash}`;
        }

        return (
          <LinkWithCopy
            href={href}
            text={formatTxAddress(hash)}
            textCopy={hash}
          />
        );
      },
      enableSorting: false
    }),

    // Pallet.Call column
    columnHelper.display({
      id: 'call',
      header: 'Call',
      cell: (props) => {
        const { pallet, call } = props.row.original;
        return (
          <span className="font-mono text-xs">
            {pallet}.{call}
          </span>
        );
      }
    }),

    // Signer column
    columnHelper.accessor('signer', {
      id: 'signer',
      header: 'Signer',
      cell: (props) => {
        const signer = props.getValue();
        if (!signer) {
          return (
            <span className="text-muted-foreground text-xs">unsigned</span>
          );
        }
        return (
          <LinkWithCopy
            href={`${RESOURCES.accounts}/${signer.id}`}
            text={formatTxAddress(signer.id)}
            textCopy={signer.id}
          />
        );
      },
      enableSorting: false
    }),

    // Fee column
    columnHelper.accessor('fee', {
      id: 'fee',
      header: 'Fee',
      cell: (props) => {
        const fee = props.getValue();
        if (!fee || fee === '0') {
          return <span className="text-muted-foreground">-</span>;
        }
        return formatMonetaryValue(Number(fee), 5);
      },
      enableSorting: false
    }),

    // Success column
    columnHelper.accessor('success', {
      id: 'success',
      header: 'Result',
      cell: (props) => {
        const success = props.getValue();
        return (
          <span
            className={cn(
              'rounded px-2 py-1 text-xs font-medium',
              success
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            )}
          >
            {success ? 'Success' : 'Failed'}
          </span>
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
      enableSorting: false
    })
  ];

  return columns;
};

// Default export
export const EXTRINSIC_COLUMNS = createExtrinsicColumns();
