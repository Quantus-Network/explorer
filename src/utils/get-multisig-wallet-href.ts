import { RESOURCES } from '@/constants/resources';

export const getMultisigWalletHref = (id: string): string =>
  `${RESOURCES.multisig}/${encodeURIComponent(id)}`;
