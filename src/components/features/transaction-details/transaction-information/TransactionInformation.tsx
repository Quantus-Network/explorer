import { notFound, useNavigate } from '@tanstack/react-router';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import * as React from 'react';

import useApiClient from '@/api';
import { EXTRINSIC_TRANSACTION_COLUMNS } from '@/components/common/table-columns/EXTRINSIC_TRANSACTION_COLUMNS';
import { Badge } from '@/components/ui/badge';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { DataTable } from '@/components/ui/composites/data-table/DataTable';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { TimestampDisplay } from '@/components/ui/timestamp-display';
import { RESOURCES } from '@/constants/resources';
import type { ExtrinsicDetail, ExtrinsicTransfer } from '@/schemas';
import { formatBlockHeight, formatMonetaryValue } from '@/utils/formatter';
import { isWormholeExtrinsic } from '@/utils/get-extrinsic-detail-path';

export interface TransactionInformationProps {
  hash: string;
}

export const TransactionInformation: React.FC<TransactionInformationProps> = ({
  hash
}) => {
  const api = useApiClient();
  const navigate = useNavigate();
  const { data, loading } = api.transactions.getByHash().useQuery(hash);

  const transfers: ExtrinsicTransfer[] = React.useMemo(() => {
    if (!data) return [];
    if (data.transfersByExtrinsic.length > 0) {
      return data.transfersByExtrinsic.map(
        ({ id, amount, timestamp, from, to, block }) => ({
          id,
          amount,
          timestamp,
          from,
          to,
          block
        })
      );
    }
    return data.transfersById.map(
      ({ id, amount, timestamp, from, to, block }) => ({
        id,
        amount,
        timestamp,
        from,
        to,
        block
      })
    );
  }, [data]);

  const extrinsic: ExtrinsicDetail | undefined = React.useMemo(() => {
    if (!data) return undefined;
    if (data.extrinsics[0]) return data.extrinsics[0];
    const fromTransfer =
      data.transfersByExtrinsic[0]?.extrinsic ??
      data.transfersById[0]?.extrinsic;
    return fromTransfer ?? undefined;
  }, [data]);

  const primaryTransfer = transfers[0];
  const primaryId = extrinsic?.id ?? primaryTransfer?.id;
  const primaryBlock = extrinsic?.block ?? primaryTransfer?.block;
  const primaryTimestamp = extrinsic?.timestamp ?? primaryTransfer?.timestamp;

  const isRedirectingToWormhole =
    !loading && !!extrinsic && isWormholeExtrinsic(extrinsic);

  React.useEffect(() => {
    if (!isRedirectingToWormhole) return;

    navigate({
      to: '/transactions/wormhole/$id',
      params: { id: extrinsic.id },
      replace: true
    });
  }, [isRedirectingToWormhole, extrinsic, navigate]);

  const extrinsicTransactionColumns = React.useMemo(
    () => EXTRINSIC_TRANSACTION_COLUMNS,
    []
  );

  const table = useReactTable<ExtrinsicTransfer>({
    data: transfers,
    columns: extrinsicTransactionColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true
  });

  if (
    !loading &&
    (!data ||
      (data.extrinsics.length === 0 &&
        data.transfersByExtrinsic.length === 0 &&
        data.transfersById.length === 0))
  ) {
    throw notFound();
  }

  if (isRedirectingToWormhole) {
    return null;
  }

  const extrinsicInfo: Partial<ExtrinsicDetail>[] = [
    {
      id: primaryId,
      pallet: extrinsic?.pallet,
      call: extrinsic?.call,
      success: extrinsic?.success,
      fee: extrinsic?.fee,
      timestamp: primaryTimestamp,
      signer: extrinsic?.signer,
      block: primaryBlock
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <DataList<Partial<ExtrinsicDetail>>
        loading={loading}
        data={extrinsicInfo}
        fields={[
          {
            label: 'Hash',
            key: 'id',
            render: (value) =>
              value ? (
                <TextWithCopy text={value as string} className="break-all" />
              ) : (
                <span className="text-muted-text">—</span>
              )
          },
          {
            label: 'Call',
            key: 'pallet',
            render: (_, item) =>
              item.pallet && item.call ? (
                <span className="inline-block border border-border-subtle bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted-text">
                  {item.pallet}.{item.call}
                </span>
              ) : (
                <span className="text-muted-text">—</span>
              )
          },
          {
            label: 'Block',
            key: 'block',
            render: (value) => {
              const block = value as ExtrinsicDetail['block'] | undefined;
              if (!block) return <span className="text-muted-text">—</span>;
              return (
                <LinkWithCopy
                  text={formatBlockHeight(block.height)}
                  href={`${RESOURCES.blocks}/${block.height}`}
                />
              );
            }
          },
          {
            label: 'Time',
            key: 'timestamp',
            render: (value) =>
              value ? (
                <TimestampDisplay timestamp={value as string} />
              ) : (
                <span className="text-muted-text">—</span>
              )
          },
          {
            label: 'Signer',
            key: 'signer',
            render: (value) => {
              const signer = value as ExtrinsicDetail['signer'];
              if (!signer) {
                return <span className="text-muted-text">unsigned</span>;
              }
              return (
                <LinkWithCopy
                  truncate={false}
                  text={signer.id}
                  href={`${RESOURCES.accounts}/${signer.id}`}
                  className="break-all"
                />
              );
            }
          },
          {
            label: 'Fee',
            key: 'fee',
            render: (value) =>
              value != null ? (
                formatMonetaryValue(value)
              ) : (
                <span className="text-muted-text">—</span>
              )
          },
          {
            label: 'Result',
            key: 'success',
            render: (value) =>
              value == null ? (
                <span className="text-muted-text">—</span>
              ) : (
                <Badge variant={value ? 'success' : 'error'}>
                  {value ? 'Success' : 'Failed'}
                </Badge>
              )
          }
        ]}
      />

      {transfers.length > 0 && (
        <DataTable
          table={table}
          fetch={{
            status: 'success',
            errorFallback: null
          }}
        />
      )}
    </div>
  );
};
