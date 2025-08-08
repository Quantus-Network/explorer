import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { Block } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';

const columnHelper = createColumnHelper<Block>();

export const BLOCK_COLUMNS = [
  columnHelper.accessor('height', {
    id: 'height',
    header: 'Height',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.blocks}/${props.getValue()}`}
        text={props.getValue().toString()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('hash', {
    id: 'hash',
    header: 'Hash',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.blocks}/${props.getValue()}`}
        text={props.getValue().toString()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('reward', {
    id: 'reward',
    header: 'Reward',
    cell: (props) => formatMonetaryValue(props.getValue()),
    enableSorting: true
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => <TimestampDisplay timestamp={props.getValue()} />,
    enableSorting: true
  })
];
