import { Badge, type BadgeProps } from '@/components/ui/badge';
import type { AccountType } from '@/constants/account-types';
import {
  type AccountAddressClassification,
  accountTypeLabel,
  classifyAccountAddress
} from '@/utils/classify-account-address';

const LABEL_CLASS = 'font-mono text-[11px] text-muted-text';

const BADGE_VARIANTS: Partial<Record<AccountType, BadgeProps['variant']>> = {
  multisig: 'miner',
  high_security: 'reversible',
  guardian: 'immediate'
};

export function AccountAddressLabel(
  classification: AccountAddressClassification
) {
  const variant = BADGE_VARIANTS[classifyAccountAddress(classification)];
  const label = accountTypeLabel(classification);

  return variant ? (
    <Badge variant={variant}>{label}</Badge>
  ) : (
    <span className={LABEL_CLASS}>{label}</span>
  );
}

export function AccountTags({ tags }: { tags: readonly string[] }) {
  return <span className={LABEL_CLASS}>{tags.join(', ')}</span>;
}
