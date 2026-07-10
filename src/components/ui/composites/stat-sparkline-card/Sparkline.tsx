import {
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

const VIEW_WIDTH = 120;
const VIEW_HEIGHT = 56;
const TOP_PAD = 4;
const BOTTOM_PAD = 2;

export interface SparklinePoint {
  value: number;
  label: string;
  displayValue: string;
}

export interface SparklineProps {
  points: SparklinePoint[];
  stroke: string;
  className?: string;
}

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

function buildCoords(values: number[]): PointCoord[] {
  if (values.length === 0) return [];

  const min = Math.min(...values);
  const max = Math.max(...values);
  const isFlat = max === min;
  const range = max - min || 1;
  const usableHeight = VIEW_HEIGHT - TOP_PAD - BOTTOM_PAD;
  const stepX =
    values.length === 1 ? 0 : VIEW_WIDTH / Math.max(values.length - 1, 1);

  return values.map((value, index) => {
    const x = values.length === 1 ? VIEW_WIDTH / 2 : index * stepX;
    const y = isFlat
      ? VIEW_HEIGHT / 2
      : TOP_PAD + usableHeight - ((value - min) / range) * usableHeight;

    return {
      x,
      y,
      xPct: x / VIEW_WIDTH,
      yPct: y / VIEW_HEIGHT
    };
  });
}

function buildPaths(coords: PointCoord[]): { line: string; area: string } {
  if (coords.length === 0) {
    return { line: '', area: '' };
  }

  const line = coords.map(({ x, y }) => `${x},${y}`).join(' ');
  const first = coords[0];
  const last = coords[coords.length - 1];

  if (!first || !last) {
    return { line: '', area: '' };
  }

  const area = [
    `${first.x},${VIEW_HEIGHT}`,
    ...coords.map(({ x, y }) => `${x},${y}`),
    `${last.x},${VIEW_HEIGHT}`
  ].join(' ');

  return { line, area };
}

export const Sparkline = ({ points, stroke, className }: SparklineProps) => {
  const gradientId = useId().replace(/:/g, '');
  const svgRef = useRef<SVGSVGElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<HoverState | null>(null);

  const values = useMemo(() => points.map((point) => point.value), [points]);
  const coords = useMemo(() => buildCoords(values), [values]);
  const { line, area } = useMemo(() => buildPaths(coords), [coords]);

  useLayoutEffect(() => {
    if (hover == null || !tipRef.current || !svgRef.current) return;

    const tip = tipRef.current;
    const rect = svgRef.current.getBoundingClientRect();
    const coord = coords[hover.index];
    if (!coord) return;

    const tipWidth = tip.offsetWidth || 100;
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
      const xPct = (event.clientX - rect.left) / rect.width;

      let ptIdx = 0;
      let minDist = Infinity;
      coords.forEach((coord, index) => {
        const distance = Math.abs(coord.xPct - xPct);
        if (distance < minDist) {
          minDist = distance;
          ptIdx = index;
        }
      });

      const coord = coords[ptIdx];
      if (!coord) return;

      const tipWidth = tipRef.current?.offsetWidth || 100;
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
    [coords]
  );

  const clearHover = useCallback(() => {
    setHover(null);
  }, []);

  if (points.length === 0) {
    return <div className={cn('h-14 w-full', className)} aria-hidden />;
  }

  const activePoint = hover ? points[hover.index] : null;

  return (
    <>
      <svg
        ref={svgRef}
        className={cn('mt-2 block h-14 w-full cursor-crosshair', className)}
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Trend sparkline"
        onMouseMove={updateHover}
        onMouseLeave={clearHover}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity={0.18} />
            <stop offset="100%" stopColor={stroke} stopOpacity={0} />
          </linearGradient>
        </defs>
        <polygon points={area} fill={`url(#${gradientId})`} />
        <polyline
          points={line}
          fill="none"
          stroke={stroke}
          strokeWidth={1.2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

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
                background: stroke,
                opacity: 0.5
              }}
            />
            <div
              className="pointer-events-none fixed z-[998] size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] bg-surface-2"
              style={{
                display: hover ? 'block' : 'none',
                left: hover?.dotX,
                top: hover?.dotY,
                borderColor: stroke
              }}
            />
            <div
              ref={tipRef}
              className="pointer-events-none fixed z-[999] whitespace-nowrap border border-border-strong bg-surface-2 px-2.5 py-1 font-mono text-[10px] leading-[1.7] text-content"
              style={{
                display: hover && activePoint ? 'block' : 'none',
                left: hover?.tipLeft,
                top: hover?.tipTop
              }}
            >
              {activePoint && (
                <>
                  <span className="mb-px block" style={{ color: stroke }}>
                    {activePoint.label}
                  </span>
                  {activePoint.displayValue}
                </>
              )}
            </div>
          </>,
          document.body
        )}
    </>
  );
};
