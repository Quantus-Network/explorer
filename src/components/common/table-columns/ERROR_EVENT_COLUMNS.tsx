import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { ErrorEvent } from '@/schemas';
import { formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<ErrorEvent>();

export const ERROR_EVENT_COLUMNS = [
  columnHelper.accessor('extrinsicHash', {
    id: 'extrinsicHash',
    header: 'Extrinsic Hash',
    cell: (props) =>
      props.getValue() ? (
        <LinkWithCopy
          href={`${RESOURCES.transactions}/${props.getValue()}`}
          text={formatTxAddress(props.getValue() ?? '-')}
          textCopy={props.getValue() ?? ''}
        />
      ) : (
        'Is not available'
      ),
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
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  }),
  columnHelper.accessor('errorType', {
    id: 'errorType',
    header: 'Type',
    cell: (props) => props.getValue(),
    enableSorting: true
  }),
  columnHelper.accessor('errorName', {
    id: 'errorName',
    header: 'Name',
    cell: (props) => props.getValue() ?? '-',
    enableSorting: true
  })
];
