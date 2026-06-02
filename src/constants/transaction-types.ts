import type { UnifiedTransactionType } from '@/schemas/unified-transaction';

export const TRANSACTION_TYPE_CONFIG: Record<
  UnifiedTransactionType,
  { label: string; className: string }
> = {
  immediate: {
    label: 'Immediate',
    className: 'bg-blue-100 text-blue-800'
  },
  'scheduled-reversible': {
    label: 'Scheduled Reversible',
    className: 'bg-purple-100 text-purple-800'
  },
  'executed-reversible': {
    label: 'Executed Reversible',
    className: 'bg-green-100 text-green-800'
  },
  'cancelled-reversible': {
    label: 'Cancelled Reversible',
    className: 'bg-gray-100 text-gray-800'
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
  },
  'multisig-created': {
    label: 'Multisig Created',
    className: 'bg-cyan-100 text-cyan-800'
  },
  'multisig-proposal-created': {
    label: 'Proposal Created',
    className: 'bg-teal-100 text-teal-800'
  },
  'multisig-signer-approved': {
    label: 'Signer Approved',
    className: 'bg-sky-100 text-sky-800'
  },
  'multisig-proposal-ready': {
    label: 'Proposal Ready',
    className: 'bg-lime-100 text-lime-800'
  },
  'multisig-proposal-executed': {
    label: 'Proposal Executed',
    className: 'bg-green-100 text-green-800'
  },
  'multisig-proposal-cancelled': {
    label: 'Proposal Cancelled',
    className: 'bg-orange-100 text-orange-800'
  },
  'multisig-proposal-removed': {
    label: 'Proposal Removed',
    className: 'bg-yellow-100 text-yellow-800'
  },
  'multisig-deposits-claimed': {
    label: 'Deposits Claimed',
    className: 'bg-violet-100 text-violet-800'
  }
};
