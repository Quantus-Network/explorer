import { createColumnHelper } from '@tanstack/react-table';

import { InlineFetchError } from '@/components/ui/composites/fetch-error/FetchError';
import { AccountAddressCell } from '@/components/ui/composites/account-address-cell/AccountAddressCell';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { VestingScheduleListItem } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';
import { vestedAmount, vestingMsToDate } from '@/utils/vesting-schedule';

const columnHelper = createColumnHelper<VestingScheduleListItem>();

const timestampCell = (value: string | null | undefined, format?: string) => {
  if (!value) return '—';

  try {
    return (
      <TimestampDisplay
        timestamp={vestingMsToDate(value).toISOString()}
        format={format}
      />
    );
  } catch (error) {
    return (
      <InlineFetchError
        error={error instanceof Error ? error : 'Invalid timestamp'}
      />
    );
  }
};

export const VESTING_SCHEDULE_COLUMNS = [
  columnHelper.accessor('beneficiary', {
    id: 'beneficiary',
    header: 'Beneficiary',
    cell: (props) => {
      const address = props.getValue();
      if (!address) return '-';
      return (
        <AccountAddressCell
          address={address}
          href={`${RESOURCES.accounts}/${address}`}
          truncate={false}
        />
      );
    },
    enableSorting: true
  }),
  columnHelper.accessor('total', {
    id: 'total',
    header: 'Total',
    cell: (props) => formatMonetaryValue(props.getValue(), 2),
    enableSorting: true
  }),
  columnHelper.accessor('claimed', {
    id: 'claimed',
    header: 'Claimed',
    cell: (props) => formatMonetaryValue(props.getValue(), 2),
    enableSorting: true
  }),
  columnHelper.display({
    id: 'unlocked',
    header: 'Unlocked',
    cell: ({ row }) => {
      try {
        return formatMonetaryValue(
          vestedAmount(row.original, BigInt(Date.now())),
          2
        );
      } catch (error) {
        return (
          <InlineFetchError
            error={error instanceof Error ? error : 'Invalid schedule'}
          />
        );
      }
    },
    enableSorting: false
  }),
  columnHelper.accessor('cliff', {
    id: 'cliff',
    header: 'Cliff',
    cell: (props) => timestampCell(props.getValue(), 'MM/dd/yyyy'),
    enableSorting: true
  }),
  columnHelper.accessor('end', {
    id: 'end',
    header: 'End',
    cell: (props) => timestampCell(props.getValue(), 'MM/dd/yyyy'),
    enableSorting: true
  }),
  columnHelper.accessor('last_claim_at', {
    id: 'last_claim_at',
    header: 'Last claim',
    cell: (props) => timestampCell(props.getValue()),
    enableSorting: true
  })
];
