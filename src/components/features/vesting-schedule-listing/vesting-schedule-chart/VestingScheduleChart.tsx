import { utc } from '@date-fns/utc';
import { format } from 'date-fns/format';
import {
  type MouseEvent,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';

import { Card, CardContent } from '@/components/ui/card';
import { InlineFetchError } from '@/components/ui/composites/fetch-error/FetchError';
import { Skeleton } from '@/components/ui/skeleton';
import { formatMonetaryValue } from '@/utils/formatter';

import { type VestingScheduleChartState } from './hook';

const HIT_PX = 6;
const STROKE = 'var(--flare)';
const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 120;
const TOP_PAD = 8;
const BOTTOM_PAD = 8;

interface PointCoord {
  x: number;
  y: number;
  xPct: number;
  yPct: number;
}

interface HoverState {
  index: number;
  tipLeft: number;
  tipTop: number;
  dotX: number;
  dotY: number;
  hairlineTop: number;
  hairlineHeight: number;
}

const axisAlign = (pct: number) => {
  if (pct === 0) return undefined;
  if (pct === 1) return 'translateX(-100%)';
  return 'translateX(-50%)';
};

export const VestingScheduleChart = ({
  chart
}: {
  chart: VestingScheduleChartState;
}) => {
  const { series, amounts, nowMs, unlockedNow, getStatus, error } = chart;
  const status = getStatus();
  const gradientId = useId().replace(/:/g, '');
  const svgRef = useRef<SVGSVGElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<HoverState | null>(null);

  const coords = useMemo(() => {
    if (series.length === 0) return [] as PointCoord[];

    const minT = series[0]?.t ?? 0;
    const maxT = series[series.length - 1]?.t ?? minT;
    const span = maxT - minT || 1;
    const maxAmount = Math.max(...amounts, 0);
    const usableHeight = VIEW_HEIGHT - TOP_PAD - BOTTOM_PAD;

    return series.map((point, index) => {
      const amount = amounts[index] ?? 0;
      const x =
        series.length === 1
          ? VIEW_WIDTH / 2
          : ((point.t - minT) / span) * VIEW_WIDTH;
      const y =
        maxAmount === 0
          ? VIEW_HEIGHT / 2
          : TOP_PAD + usableHeight - (amount / maxAmount) * usableHeight;

      return {
        x,
        y,
        xPct: x / VIEW_WIDTH,
        yPct: y / VIEW_HEIGHT
      };
    });
  }, [amounts, series]);

  const { line, area } = useMemo(() => {
    if (coords.length === 0) return { line: '', area: '' };

    const first = coords[0];
    const last = coords[coords.length - 1];
    if (!first || !last) return { line: '', area: '' };

    return {
      line: coords.map(({ x, y }) => `${x},${y}`).join(' '),
      area: [
        `${first.x},${VIEW_HEIGHT}`,
        ...coords.map(({ x, y }) => `${x},${y}`),
        `${last.x},${VIEW_HEIGHT}`
      ].join(' ')
    };
  }, [coords]);

  const today = useMemo(() => {
    if (nowMs == null) return null;

    let index = -1;
    series.forEach((point, pointIndex) => {
      if (point.t === nowMs) index = pointIndex;
    });

    return index >= 0 ? coords[index] ?? null : null;
  }, [coords, nowMs, series]);

  useLayoutEffect(() => {
    if (hover == null || !tipRef.current || !svgRef.current) return;

    const tip = tipRef.current;
    const rect = svgRef.current.getBoundingClientRect();
    const coord = coords[hover.index];
    if (!coord) return;

    const tipWidth = tip.offsetWidth || 140;
    const tipHeight = tip.offsetHeight || 36;
    const dotX = rect.left + coord.xPct * rect.width;
    const nextTipLeft = Math.min(
      Math.max(8, dotX - tipWidth / 2),
      window.innerWidth - tipWidth - 8
    );
    const nextTipTop = rect.top - tipHeight - 8;

    if (nextTipLeft === hover.tipLeft && nextTipTop === hover.tipTop) return;

    setHover((current) =>
      current
        ? { ...current, tipLeft: nextTipLeft, tipTop: nextTipTop }
        : current
    );
  }, [coords, hover?.index, hover?.tipLeft, hover?.tipTop]);

  const updateHover = useCallback(
    (event: MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg || coords.length === 0) return;

      const rect = svg.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const todayIndex =
        nowMs == null
          ? -1
          : series.reduce(
              (found, point, index) => (point.t === nowMs ? index : found),
              -1
            );
      const todayPx =
        todayIndex >= 0 ? (coords[todayIndex]?.xPct ?? 0) * rect.width : null;
      const endIndex = coords.length - 1;
      const endPx = (coords[endIndex]?.xPct ?? 1) * rect.width;

      let ptIdx = 0;
      if (todayPx != null && Math.abs(pointerX - todayPx) <= HIT_PX) {
        ptIdx = todayIndex;
      } else if (Math.abs(pointerX - endPx) <= HIT_PX) {
        ptIdx = endIndex;
      } else {
        const xPct = pointerX / rect.width;
        let minDist = Infinity;
        coords.forEach((coord, index) => {
          const distance = Math.abs(coord.xPct - xPct);
          if (distance <= minDist) {
            minDist = distance;
            ptIdx = index;
          }
        });
      }

      const coord = coords[ptIdx];
      if (!coord) return;

      const tipWidth = tipRef.current?.offsetWidth || 140;
      const tipHeight = tipRef.current?.offsetHeight || 36;
      const dotX = rect.left + coord.xPct * rect.width;
      const dotY = rect.top + coord.yPct * rect.height;

      setHover({
        index: ptIdx,
        tipLeft: Math.min(
          Math.max(8, dotX - tipWidth / 2),
          window.innerWidth - tipWidth - 8
        ),
        tipTop: rect.top - tipHeight - 8,
        dotX,
        dotY,
        hairlineTop: rect.top,
        hairlineHeight: rect.height
      });
    },
    [coords, nowMs, series]
  );

  const clearHover = useCallback(() => {
    setHover(null);
  }, []);

  const active = hover ? series[hover.index] : null;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-mono text-[11px] font-normal uppercase tracking-[0.06em] text-muted-text">
        Unlock Timeline
      </h2>

      <Card className="border border-border-subtle">
        <CardContent className="p-5 px-6">
          {status === 'loading' && <Skeleton className="h-40" />}
          {status === 'error' && <InlineFetchError error={error} />}
          {status === 'success' && series.length === 0 && (
            <p className="font-mono text-[12px] text-muted-text">
              No vesting schedules
            </p>
          )}
          {status === 'success' && series.length > 0 && (
            <div className="relative">
              <svg
                ref={svgRef}
                className="block h-32 w-full cursor-crosshair"
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
                preserveAspectRatio="none"
                role="img"
                aria-label="Cumulative unlock timeline"
                onMouseMove={updateHover}
                onMouseLeave={clearHover}
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={STROKE} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={STROKE} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <polygon points={area} fill={`url(#${gradientId})`} />
                <polyline
                  points={line}
                  fill="none"
                  stroke={STROKE}
                  strokeWidth={1.2}
                  vectorEffect="non-scaling-stroke"
                />
                {today && (
                  <line
                    x1={today.x}
                    x2={today.x}
                    y1={0}
                    y2={VIEW_HEIGHT}
                    stroke={STROKE}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                  >
                    <title>Today</title>
                  </line>
                )}
              </svg>
              {today && (
                <span
                  className="pointer-events-none absolute top-0 font-mono text-[10px] text-flare"
                  style={{
                    left: `${today.xPct * 100}%`,
                    transform: axisAlign(today.xPct)
                  }}
                >
                  Today
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {typeof document !== 'undefined' &&
        createPortal(
          <>
            <div
              className="pointer-events-none fixed z-[997]"
              style={{
                display: hover ? 'block' : 'none',
                left: hover?.dotX,
                top: hover?.hairlineTop,
                width: 1,
                height: hover?.hairlineHeight,
                background: STROKE,
                opacity: 0.5
              }}
            />
            <div
              className="pointer-events-none fixed z-[998] size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] bg-surface-2"
              style={{
                display: hover ? 'block' : 'none',
                left: hover?.dotX,
                top: hover?.dotY,
                borderColor: STROKE
              }}
            />
            <div
              ref={tipRef}
              className="numeric pointer-events-none fixed z-[999] whitespace-nowrap border border-border-strong bg-surface-2 px-2.5 py-1 text-[10px] leading-[1.7] text-content"
              style={{
                display: hover && active ? 'block' : 'none',
                left: hover?.tipLeft,
                top: hover?.tipTop
              }}
            >
              {active && (
                <>
                  <span className="mb-px block text-flare">
                    {format(new Date(active.t), 'MM/dd/yyyy', { in: utc })}
                  </span>
                  {formatMonetaryValue(
                    active.t === nowMs && unlockedNow != null
                      ? unlockedNow
                      : active.unlocked,
                    2
                  )}
                </>
              )}
            </div>
          </>,
          document.body
        )}
    </div>
  );
};
