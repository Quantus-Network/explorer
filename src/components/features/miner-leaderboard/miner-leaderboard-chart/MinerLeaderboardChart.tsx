import {
  ArcElement,
  Chart,
  type ChartOptions,
  Legend,
  Tooltip,
  type TooltipItem
} from 'chart.js';
import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { useMediaQuery } from 'usehooks-ts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatTxAddress } from '@/utils/formatter';

import { useMinerLeaderboardChart } from './hook';

Chart.register(ArcElement, Legend, Tooltip);

const SM_BREAKPOINT = '(min-width: 576px)';

export const MinerLeaderboardChart = () => {
  const isSmUp = useMediaQuery(SM_BREAKPOINT, {
    defaultValue: false,
    initializeWithValue: false
  });

  const { chartData, dominantMiner, total, getStatus, error } =
    useMinerLeaderboardChart();
  const status = getStatus();

  const pieOptions: ChartOptions<'pie'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      layout: {
        padding: isSmUp ? 12 : 8
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: isSmUp
            ? {
                font: { size: 12 },
                padding: 10,
                boxWidth: 40
              }
            : {
                font: { size: 10 },
                padding: 4,
                boxWidth: 12
              }
        },
        tooltip: {
          callbacks: {
            title: (tooltipItems: TooltipItem<'pie'>[]) =>
              tooltipItems[0]?.label ?? '',
            label: (context: {
              parsed: number;
              dataset: { data: number[] };
            }) => {
              const totalBlocks = context.dataset.data.reduce(
                (a, b) => a + b,
                0
              );
              const pct =
                totalBlocks > 0
                  ? ((context.parsed / totalBlocks) * 100).toFixed(1)
                  : '0';
              return ` ${context.parsed.toLocaleString()} blocks (${pct}%)`;
            }
          }
        }
      }
    }),
    [isSmUp]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Block Mining Distribution</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {status === 'loading' && <Skeleton className="h-52 sm:h-64" />}
        {status === 'error' && <p>Error: {error && error.message}</p>}
        {status === 'success' && chartData && (
          <div className="flex flex-col gap-4">
            {dominantMiner && (
              <p className="min-w-0 break-words text-sm text-muted-foreground">
                Dominant miner:{' '}
                <span className="font-medium text-foreground">
                  {formatTxAddress(dominantMiner.id ?? '')}
                </span>{' '}
                with{' '}
                <span className="font-medium text-foreground">
                  {(dominantMiner.total_mined_blocks ?? 0).toLocaleString()}
                </span>{' '}
                blocks out of{' '}
                <span className="font-medium text-foreground">
                  {total.toLocaleString()}
                </span>{' '}
                total (
                {total > 0
                  ? (
                      ((dominantMiner.total_mined_blocks ?? 0) / total) *
                      100
                    ).toFixed(1)
                  : '0'}
                %)
              </p>
            )}
            <div className="mx-auto w-full min-w-0 max-w-full sm:max-w-sm">
              <Pie data={chartData} options={pieOptions} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
