import type { VariantProps } from 'class-variance-authority';

import type { badgeVariants } from '@/components/ui/badge';
import type { UnifiedTransactionType } from '@/schemas/unified-transaction';

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

export const TRANSACTION_TYPE_CONFIG: Record<
  UnifiedTransactionType,
  { label: string; variant: BadgeVariant }
> = {
  immediate: {
    label: 'Immediate',
    variant: 'immediate'
  },
  'scheduled-reversible': {
    label: 'Scheduled Reversible',
    variant: 'reversible'
  },
  'executed-reversible': {
    label: 'Executed Reversible',
    variant: 'success'
  },
  'cancelled-reversible': {
    label: 'Cancelled Reversible',
    variant: 'error'
  },
  'miner-reward': {
    label: 'Miner Reward',
    variant: 'miner'
  },
  'high-security': {
    label: 'High Security',
    variant: 'reversible'
  },
  wormhole: {
    label: 'Wormhole',
    variant: 'reversible'
  },
  error: {
    label: 'Error',
    variant: 'error'
  },
  'multisig-created': {
    label: 'Multisig Created',
    variant: 'miner'
  },
  'multisig-proposal-created': {
    label: 'Proposal Created',
    variant: 'reversible'
  },
  'multisig-signer-approved': {
    label: 'Signer Approved',
    variant: 'immediate'
  },
  'multisig-proposal-ready': {
    label: 'Proposal Ready',
    variant: 'immediate'
  },
  'multisig-proposal-executed': {
    label: 'Proposal Executed',
    variant: 'success'
  },
  'multisig-proposal-cancelled': {
    label: 'Proposal Cancelled',
    variant: 'error'
  },
  'multisig-proposal-removed': {
    label: 'Proposal Removed',
    variant: 'miner'
  },
  'multisig-deposits-claimed': {
    label: 'Deposits Claimed',
    variant: 'miner'
  }
};
