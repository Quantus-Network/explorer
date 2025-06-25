import { createColumnHelper } from '@tanstack/react-table';

import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { RESOURCES } from '@/constants/resources';
import type { Account } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';

const columnHelper = createColumnHelper<Account>();

export const ACCOUNT_COLUMNS = [
  columnHelper.accessor('id', {
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
  columnHelper.accessor('balance', {
    id: 'balance',
    header: 'Balance',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  })
  // columnHelper.accessor('lastUpdated', {
  //   id: 'last-updated',
  //   header: 'Last Updated',
  //   cell: (props) =>
  //     format(
  //       (typeof props.getValue() === 'string' && new Date(props.getValue())) ||
  //         props.getValue(),
  //       'MM/dd/yyyy, hh:mm:ss'
  //     ),
  //   enableSorting: true
  // })
];
