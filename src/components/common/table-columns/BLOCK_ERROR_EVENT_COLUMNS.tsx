import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { BlockErrorEvent } from '@/schemas';
import { formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<BlockErrorEvent>();

export const BLOCK_ERROR_EVENT_COLUMNS = [
  columnHelper.accessor('node.extrinsic.id', {
    id: 'extrinsicHash',
    header: 'Extrinsic Hash',
    cell: (props) =>
      props.getValue() ? (
        <LinkWithCopy
          href={`${RESOURCES.errors}/${props.getValue()}`}
          text={formatTxAddress(props.getValue() ?? '-')}
          textCopy={props.getValue() ?? ''}
        />
      ) : (
        'Is not available'
      ),
    enableSorting: false
  }),
  columnHelper.accessor('node.block.height', {
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
  columnHelper.accessor('node.timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  }),
  columnHelper.accessor('node.errorType', {
    id: 'errorType',
    header: 'Type',
    cell: (props) => props.getValue(),
    enableSorting: true
  }),
  columnHelper.accessor('node.errorName', {
    id: 'errorName',
    header: 'Name',
    cell: (props) => props.getValue() ?? '-',
    enableSorting: true
  })
];
