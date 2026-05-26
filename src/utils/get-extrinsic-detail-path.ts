import { RESOURCES } from '@/constants/resources';

export interface ExtrinsicRouteInput {
  id: string;
  pallet: string;
  call: string;
}

export const isWormholeExtrinsic = ({
  pallet
}: Pick<ExtrinsicRouteInput, 'pallet'>) => pallet === 'Wormhole';

export const getExtrinsicDetailPath = ({
  id,
  pallet,
  call
}: ExtrinsicRouteInput): string => {
  if (isWormholeExtrinsic({ pallet })) {
    return `${RESOURCES.wormhole}/${id}`;
  }

  if (pallet === 'Balances') {
    return `${RESOURCES.transactions}/${id}`;
  }

  if (pallet === 'ReversibleTransfers' && call === 'schedule_transfer') {
    return `${RESOURCES.scheduledReversibleTransactions}/${id}`;
  }

  if (pallet === 'ReversibleTransfers' && call === 'execute_transfer') {
    return `${RESOURCES.executedReversibleTransactions}/${id}`;
  }

  if (pallet === 'ReversibleTransfers' && call === 'cancel_transfer') {
    return `${RESOURCES.cancelledReversibleTransactions}/${id}`;
  }

  return `${RESOURCES.transactions}/${id}`;
};
