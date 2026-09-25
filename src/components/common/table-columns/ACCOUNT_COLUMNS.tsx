import { createColumnHelper } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { AccountAddressCell } from '@/components/ui/composites/account-address-cell/AccountAddressCell';
import { RESOURCES } from '@/constants/resources';
import type { AccountListItem } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';

const columnHelper = createColumnHelper<AccountListItem>();

export const ACCOUNT_COLUMNS = [
  columnHelper.accessor('id', {
    id: 'id',
    header: 'Address',
    cell: (props) => (
      <AccountAddressCell
        address={props.getValue()}
        href={`${RESOURCES.accounts}/${props.getValue()}`}
        truncate={false}
      />
    ),
    enableSorting: false
  }),
  columnHelper.display({
    id: 'flags',
    header: 'Flags',
    cell: (props) => {
      const {
        is_high_security: isHighSec,
        is_guardian: isGuardian,
        is_multisig: isMultisig
      } = props.row.original;
      const hasFlags = isHighSec || isGuardian || isMultisig;

      if (!hasFlags) {
        return (
          <span className="font-mono text-[11px] text-muted-text">
            Standard
          </span>
        );
      }

      return (
        <div className="flex flex-wrap items-center gap-1">
          {isHighSec && <Badge variant="reversible">High Sec</Badge>}
          {isGuardian && <Badge variant="immediate">Guardian</Badge>}
          {isMultisig && <Badge variant="miner">Multisig</Badge>}
        </div>
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('free', {
    id: 'free',
    header: 'Free',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  }),
  columnHelper.accessor('frozen', {
    id: 'frozen',
    header: 'Frozen',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  }),
  columnHelper.accessor('reserved', {
    id: 'reserved',
    header: 'Reserved',
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true
  })
];
