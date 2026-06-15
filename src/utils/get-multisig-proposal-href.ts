import { RESOURCES } from '@/constants/resources';

export const getMultisigProposalHref = (
  proposal?: { id?: string } | null
): string | undefined => {
  const recordId = proposal?.id;
  if (!recordId) return undefined;
  return `${RESOURCES.multisigProposals}/${encodeURIComponent(recordId)}`;
};
