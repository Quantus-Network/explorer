import type { UnifiedTransactionType } from '@/schemas/unified-transaction';

export const TRANSACTION_TYPE_CONFIG: Record<
  UnifiedTransactionType,
  { label: string; className: string }
> = {
  immediate: {
    label: 'Immediate',
    className: 'bg-blue-100 text-blue-800'
  },
  reversible: {
    label: 'Reversible',
    className: 'bg-purple-100 text-purple-800'
  },
  'miner-reward': {
    label: 'Miner Reward',
    className: 'bg-amber-100 text-amber-800'
  },
  'high-security': {
    label: 'High Security',
    className: 'bg-emerald-100 text-emerald-800'
  },
  wormhole: {
    label: 'Wormhole',
    className: 'bg-indigo-100 text-indigo-800'
  },
  error: {
    label: 'Error',
    className: 'bg-red-100 text-red-800'
  }
};
