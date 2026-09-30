import {
  type AccountAddressClassification,
  classifyAccountAddress
} from '@/utils/classify-account-address';

export function AccountAddressLabel(props: AccountAddressClassification) {
  return (
    <span className="font-mono text-[11px] text-muted-text">
      {classifyAccountAddress(props)}
    </span>
  );
}
