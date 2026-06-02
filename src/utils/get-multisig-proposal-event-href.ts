import { RESOURCES } from '@/constants/resources';
import type { UnifiedTransactionType } from '@/schemas/unified-transaction';

const MULTISIG_EVENT_RESOURCE: Partial<Record<UnifiedTransactionType, string>> =
  {
    'multisig-proposal-created': RESOURCES.multisigProposalCreated,
    'multisig-signer-approved': RESOURCES.multisigSignerApproved,
    'multisig-proposal-ready': RESOURCES.multisigProposalReady,
    'multisig-proposal-executed': RESOURCES.multisigProposalExecuted,
    'multisig-proposal-cancelled': RESOURCES.multisigProposalCancelled,
    'multisig-proposal-removed': RESOURCES.multisigProposalRemoved
  };

export const getMultisigProposalEventHref = (
  type: UnifiedTransactionType,
  extrinsicId?: string | null
): string | undefined => {
  const base = MULTISIG_EVENT_RESOURCE[type];
  if (!base || !extrinsicId) return undefined;
  return `${base}/${extrinsicId}`;
};
