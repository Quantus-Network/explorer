import { createColumnHelper } from '@tanstack/react-table';

import { AccountAddressCell } from '@/components/ui/composites/account-address-cell/AccountAddressCell';
import {
  AccountAddressLabel,
  AccountTags
} from '@/components/ui/composites/account-address-label/AccountAddressLabel';
import { Info } from '@/components/ui/composites/info/Info';
import { RESOURCES } from '@/constants/resources';
import type { AccountListItem } from '@/schemas';
import { formatMonetaryValue } from '@/utils/formatter';
import { knownAddressTags } from '@/utils/known-address-display';

const ENCRYPTED_BALANCE_URL =
  'https://x.com/QuantusNetwork/status/2122471182830055853';

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
    id: 'account_type',
    header: 'Account type',
    cell: (props) => {
      const account = props.row.original;

      return (
        <AccountAddressLabel
          isHighSecurity={account.is_high_security}
          isGuardian={account.is_guardian}
          isMultisig={account.is_multisig}
          isDepositOnly={account.is_deposit_only}
          hasMinedBlocks={account.has_mined_blocks}
        />
      );
    },
    enableSorting: false
  }),
  columnHelper.accessor('id', {
    id: 'tags',
    header: 'Tags',
    cell: (props) => <AccountTags tags={knownAddressTags(props.getValue())} />,
    enableSorting: false
  }),
  columnHelper.accessor('free', {
    id: 'free',
    header: () => (
      <>
        Balance
        <span
          role="presentation"
          className="flex"
          onClick={(event) => event.stopPropagation()}
        >
          <Info>
            Encrypted or potentially encrypted addresses may have a lower
            balance than displayed onchain.{' '}
            <a
              href={ENCRYPTED_BALANCE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-flare"
            >
              Learn more
            </a>
          </Info>
        </span>
      </>
    ),
    cell: (props) => formatMonetaryValue(props.getValue(), 5),
    enableSorting: true,
    sortDescFirst: true
  })
];
