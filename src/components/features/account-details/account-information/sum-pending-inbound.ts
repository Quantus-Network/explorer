import type { PendingInboundTransfersResponse } from '@/schemas';

export const sumPendingInbound = ({
  scheduled,
  executed,
  cancelled
}: PendingInboundTransfersResponse) => {
  const finalized = new Set(
    [...executed, ...cancelled].map(
      ({ scheduled_transfer_id }) => scheduled_transfer_id
    )
  );

  return scheduled
    .filter(({ id, from_id, to_id }) => from_id !== to_id && !finalized.has(id))
    .reduce((sum, { amount }) => sum + BigInt(amount), BigInt(0));
};
