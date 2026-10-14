import type { AccountAddressClassification } from '@/utils/classify-account-address';
import { accountAddressTypeLabel } from '@/utils/minting-address-display';

export function AccountAddressLabel({
  address,
  ...classification
}: AccountAddressClassification & { address: string }) {
  return (
    <span className="font-mono text-[11px] text-muted-text">
      {accountAddressTypeLabel(address, classification)}
    </span>
  );
}
