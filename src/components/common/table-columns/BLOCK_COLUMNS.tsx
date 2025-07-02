import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { Block } from '@/schemas';
import { formatTimestamp } from '@/utils/formatter';

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
    cell: (props) => <TextWithCopy text={props.getValue().toString()} />,
    enableSorting: false
  }),
  columnHelper.accessor('timestamp', {
    id: 'timestamp',
    header: 'Timestamp',
    cell: (props) => formatTimestamp(props.getValue()),
    enableSorting: true
  })
];
