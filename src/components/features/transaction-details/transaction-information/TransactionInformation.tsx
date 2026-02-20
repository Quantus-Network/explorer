import { notFound } from '@tanstack/react-router';
import * as React from 'react';

import useApiClient from '@/api';
import { DataList } from '@/components/ui/composites/data-list/DataList';
import { LinkWithCopy } from '@/components/ui/composites/link-with-copy/LinkWithCopy';
import { TextWithCopy } from '@/components/ui/composites/text-with-copy/TextWithCopy';
import { ContentContainer } from '@/components/ui/content-container';
import { RESOURCES } from '@/constants/resources';
import type { ExtrinsicDetail, ExtrinsicTransfer } from '@/schemas';
import {
  formatMonetaryValue,
  formatTimestamp,
  formatTxAddress
} from '@/utils/formatter';
import { cn } from '@/lib/utils';

export interface TransactionInformationProps {
  hash: string;
}

export const TransactionInformation: React.FC<TransactionInformationProps> = ({
  hash
}) => {
  const api = useApiClient();
  const { data, loading } = api.transactions.getByHash().useQuery(hash);

  if (!loading && (!data || data.extrinsics.length === 0)) throw notFound();

  const extrinsic = data?.extrinsics[0];
  const transfers = data?.transfers ?? [];

  const extrinsicInfo: Partial<ExtrinsicDetail>[] = [
    {
      id: extrinsic?.id,
      pallet: extrinsic?.pallet,
      call: extrinsic?.call,
      success: extrinsic?.success,
      fee: extrinsic?.fee,
      timestamp: extrinsic?.timestamp,
      signer: extrinsic?.signer,
      block: extrinsic?.block
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Extrinsic Information */}
      <DataList<Partial<ExtrinsicDetail>>
        loading={loading}
        data={extrinsicInfo}
        fields={[
          {
            label: 'Extrinsic Hash',
            key: 'id',
            render: (value) => (
              <TextWithCopy text={value as string} className="break-all" />
            )
          },
          {
            label: 'Call',
            key: 'pallet',
            render: (_, item) => (
              <span className="font-mono">
                {item.pallet}.{item.call}
              </span>
            )
          },
          {
            label: 'Block',
            key: 'block',
            render: (value) => (
              <LinkWithCopy
                text={(value as ExtrinsicDetail['block']).height.toString()}
                href={`${RESOURCES.blocks}/${(value as ExtrinsicDetail['block']).height}`}
              />
            )
          },
          {
            label: 'Timestamp',
            key: 'timestamp',
            render: (value) => formatTimestamp(value, true)
          },
          {
            label: 'Signer',
            key: 'signer',
            render: (value) => {
              const signer = value as ExtrinsicDetail['signer'];
              if (!signer) {
                return <span className="text-muted-foreground">unsigned</span>;
              }
              return (
                <LinkWithCopy
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
            render: (value) => formatMonetaryValue(value)
          },
          {
            label: 'Result',
            key: 'success',
            render: (value) => (
              <span
                className={cn(
                  'rounded px-2 py-1 text-xs font-medium',
                  value
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                )}
              >
                {value ? 'Success' : 'Failed'}
              </span>
            )
          }
        ]}
      />

      {/* Transfers Table */}
      {transfers.length > 0 && (
        <ContentContainer className="flex flex-col gap-4">
          <h2>Transfers ({transfers.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">From</th>
                  <th className="text-left py-2 px-3 font-medium">To</th>
                  <th className="text-right py-2 px-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transfers.map((transfer: ExtrinsicTransfer) => (
                  <tr key={transfer.id} className="border-b">
                    <td className="py-2 px-3">
                      <LinkWithCopy
                        href={`${RESOURCES.accounts}/${transfer.from.id}`}
                        text={formatTxAddress(transfer.from.id)}
                        textCopy={transfer.from.id}
                      />
                    </td>
                    <td className="py-2 px-3">
                      <LinkWithCopy
                        href={`${RESOURCES.accounts}/${transfer.to.id}`}
                        text={formatTxAddress(transfer.to.id)}
                        textCopy={transfer.to.id}
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      {formatMonetaryValue(Number(transfer.amount), 5)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentContainer>
      )}
    </div>
  );
};
