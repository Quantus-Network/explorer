import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { BlockHighSecuritySet } from '@/schemas';
import { formatDuration, formatTxAddress } from '@/utils/formatter';

const columnHelper = createColumnHelper<BlockHighSecuritySet>();

export const BLOCK_HIGH_SECURITY_SET_COLUMNS = [
  columnHelper.accessor('node.extrinsic.id', {
    id: 'tx-hash',
    header: 'Hash',
    cell: (props) =>
      props.getValue() ? (
        <LinkWithCopy
          href={`${RESOURCES.highSecuritySets}/${props.getValue()}`}
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
  columnHelper.accessor('node.who.id', {
    id: 'who',
    header: 'Beneficiary',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={formatTxAddress(props.getValue())}
        textCopy={props.getValue()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('node.interceptor.id', {
    id: 'interceptor',
    header: 'Guardian',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={formatTxAddress(props.getValue())}
        textCopy={props.getValue()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('node.delay', {
    id: 'delay',
    header: 'Reversible Time',
    cell: (props) => formatDuration(props.getValue()),
    enableSorting: true
  })
];
