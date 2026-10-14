import {
  AccountAddressCell,
  type AccountAddressCellProps
} from '@/components/ui/composites/account-address-cell/AccountAddressCell';
import { fromAddressPlainLabel } from '@/utils/minting-address-display';

export function FromAddressCell(props: AccountAddressCellProps) {
  const label = fromAddressPlainLabel(props.address);
  if (label !== null) {
    return <span className="font-mono text-xs text-flare">{label}</span>;
  }

  return <AccountAddressCell {...props} />;
}
