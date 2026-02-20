import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import { formatMonetaryValue, formatTxAddress } from '@/utils/formatter';
// import { PrivacyScoreBadge } from '@/components/features/wormhole/PrivacyScoreBadge';
import type { WormholeExtrinsic } from '@/schemas/wormhole';

export type WormholeExtrinsicRow = WormholeExtrinsic;

const columnHelper = createColumnHelper<WormholeExtrinsicRow>();

export const WORMHOLE_EXTRINSIC_COLUMNS = [
  columnHelper.accessor('extrinsic.id', {
    id: 'extrinsic_hash',
    header: 'Extrinsic',
    cell: (props) => {
      const hash = props.getValue();
      const id = props.row.original.id;
      return (
        <LinkWithCopy
          href={`${RESOURCES.wormhole}/${id}`}
          text={hash ? formatTxAddress(hash) : formatTxAddress(id)}
        />
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('totalAmount', {
    id: 'total_amount',
    header: 'Total Amount',
    cell: (props) => formatMonetaryValue(Number(props.getValue())),
    enableSorting: true
  }),
  columnHelper.accessor('outputCount', {
    id: 'output_count',
    header: 'Outputs',
    cell: (props) => props.getValue(),
    enableSorting: false
  }),
  // Privacy score column temporarily disabled
  // columnHelper.accessor('privacyScore', {
  //   id: 'privacy_score',
  //   header: 'Privacy',
  //   cell: (props) => (
  //     <PrivacyScoreBadge
  //       score={props.getValue()}
  //       label={props.row.original.privacyLabel}
  //     />
  //   ),
  //   enableSorting: true
  // }),
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
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
