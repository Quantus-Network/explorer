import { createFileRoute, notFound } from '@tanstack/react-router';
import * as React from 'react';

import { useNetwork } from '@/components/common/network-provider/network-provider';
import { Button } from '@/components/ui/button';
import { ContentContainer } from '@/components/ui/content-container';
import { SectionContainer } from '@/components/ui/section-container';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { runGraphqlBenchmarks } from '@/lib/graphql-benchmark/run';
import type { GraphqlBenchmarkRow } from '@/lib/graphql-benchmark/types';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/dev/graphql-benchmark/')({
  beforeLoad: () => {
    if (!import.meta.env.DEV) {
      throw notFound();
    }
  },
  component: GraphqlBenchmarkPage
});

function resultsToCsv(rows: GraphqlBenchmarkRow[]) {
  const header = [
    'name',
    'durationMs',
    'responseBytes',
    'skipped',
    'skipReason',
    'errorMessage'
  ];
  const lines = [
    header.join(','),
    ...rows.map((r) =>
      [
        JSON.stringify(r.name),
        r.durationMs,
        r.responseBytes ?? '',
        r.skipped ? '1' : '0',
        r.skipReason ? JSON.stringify(r.skipReason) : '',
        r.errorMessage ? JSON.stringify(r.errorMessage) : ''
      ].join(',')
    )
  ];
  return lines.join('\n');
}

function GraphqlBenchmarkPage() {
  const { networkUrl } = useNetwork();
  const [running, setRunning] = React.useState(false);
  const [progress, setProgress] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [rows, setRows] = React.useState<GraphqlBenchmarkRow[] | null>(null);
  const [lastEndpoint, setLastEndpoint] = React.useState<string | null>(null);

  const onRun = async () => {
    setRunning(true);
    setError(null);
    setProgress(null);
    setRows(null);
    setLastEndpoint(networkUrl);
    try {
      const { results } = await runGraphqlBenchmarks({
        endpoint: networkUrl,
        onProgress: (name) => setProgress(name)
      });
      setRows(results);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
      setProgress(null);
    }
  };

  const copyJson = () => {
    if (!rows) return;
    navigator.clipboard
      .writeText(
        JSON.stringify(
          {
            endpoint: lastEndpoint,
            at: new Date().toISOString(),
            results: rows
          },
          null,
          2
        )
      )
      .catch(() => {});
  };

  const copyCsv = () => {
    if (!rows) return;
    navigator.clipboard.writeText(resultsToCsv(rows)).catch(() => {});
  };

  const statusContent = (r: GraphqlBenchmarkRow) => {
    if (r.skipped) {
      return (
        <span className="text-muted-foreground">Skipped: {r.skipReason}</span>
      );
    }
    if (r.errorMessage) {
      return <span className="text-destructive">{r.errorMessage}</span>;
    }
    return 'OK';
  };

  return (
    <SectionContainer>
      <ContentContainer className="flex max-w-6xl flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold">GraphQL benchmarks</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Development only. Runs every explorer operation sequentially against
            the selected network (
            <span className="font-mono text-xs">{networkUrl}</span>
            ), slowest first.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            onClick={onRun}
            disabled={running}
            variant="default"
          >
            {running ? 'Running…' : 'Run benchmarks'}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={!rows}
            onClick={copyJson}
          >
            Copy JSON
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={!rows}
            onClick={copyCsv}
          >
            Copy CSV
          </Button>
          {progress ? (
            <span className="text-sm text-muted-foreground">{progress}…</span>
          ) : null}
        </div>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        {rows ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operation</TableHead>
                <TableHead className="text-right">Duration (ms)</TableHead>
                <TableHead className="text-right">Response (bytes)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.name}>
                  <TableCell className="font-mono text-xs">{r.name}</TableCell>
                  <TableCell
                    className={cn(
                      'text-right tabular-nums',
                      r.skipped && 'text-muted-foreground'
                    )}
                  >
                    {r.skipped ? '—' : r.durationMs}
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right tabular-nums',
                      r.skipped && 'text-muted-foreground'
                    )}
                  >
                    {r.responseBytes != null ? r.responseBytes : '—'}
                  </TableCell>
                  <TableCell className="text-sm">{statusContent(r)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </ContentContainer>
    </SectionContainer>
  );
}
