import type {
  PendingInboundTransfersCursors,
  PendingInboundTransfersResponse
} from '@/schemas';

type PendingInboundRows = Pick<
  PendingInboundTransfersResponse,
  'scheduled' | 'executed' | 'cancelled'
>;

const lastId = (rows: { id: string }[]) => rows[rows.length - 1]?.id ?? '';

export const isPendingInboundTruncated = ({
  scheduled,
  executed,
  cancelled,
  scheduledTotal,
  executedTotal,
  cancelledTotal
}: PendingInboundTransfersResponse) =>
  scheduled.length < scheduledTotal.aggregate.count ||
  executed.length < executedTotal.aggregate.count ||
  cancelled.length < cancelledTotal.aggregate.count;

export const fetchPendingInboundRows = async (
  fetchPage: (
    cursors: PendingInboundTransfersCursors
  ) => Promise<PendingInboundTransfersResponse>,
  loaded: PendingInboundRows = { scheduled: [], executed: [], cancelled: [] }
): Promise<PendingInboundRows> => {
  const page = await fetchPage({
    scheduled_after: lastId(loaded.scheduled),
    executed_after: lastId(loaded.executed),
    cancelled_after: lastId(loaded.cancelled)
  });
  const rows = {
    scheduled: [...loaded.scheduled, ...page.scheduled],
    executed: [...loaded.executed, ...page.executed],
    cancelled: [...loaded.cancelled, ...page.cancelled]
  };

  if (!isPendingInboundTruncated({ ...page, ...rows })) return rows;
  if (
    page.scheduled.length + page.executed.length + page.cancelled.length ===
    0
  ) {
    throw new Error('Pending inbound transfers ended before indexer totals');
  }
  return fetchPendingInboundRows(fetchPage, rows);
};

export const sumPendingInbound = ({
  scheduled,
  executed,
  cancelled
}: PendingInboundRows) => {
  const finalized = new Set(
    [...executed, ...cancelled].map(
      ({ scheduled_transfer_id }) => scheduled_transfer_id
    )
  );

  return scheduled
    .filter(({ id, from_id, to_id }) => from_id !== to_id && !finalized.has(id))
    .reduce((sum, { amount }) => sum + BigInt(amount), BigInt(0));
};
