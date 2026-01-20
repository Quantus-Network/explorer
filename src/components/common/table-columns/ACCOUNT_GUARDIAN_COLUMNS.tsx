import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { AccountGuardian } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';

const columnHelper = createColumnHelper<AccountGuardian>();

export const ACCOUNT_GUARDIAN_COLUMNS = [
  columnHelper.accessor('node.interceptor.id', {
    id: 'id',
    header: 'Identity',
    cell: (props) => (
      <LinkWithCopy
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        text={props.getValue()}
      />
    ),
    enableSorting: false
  }),
  columnHelper.accessor('node.interceptor.free', {
    id: 'free',
    header: 'Free',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  }),
  columnHelper.accessor('node.interceptor.frozen', {
    id: 'frozen',
    header: 'Frozen',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  }),
  columnHelper.accessor('node.interceptor.reserved', {
    id: 'reserved',
    header: 'Reserved',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  })
];
