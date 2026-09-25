export class InvalidVestingScheduleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidVestingScheduleError';
  }
}

export interface VestingUnlockSchedule {
  start: string;
  cliff: string;
  end: string;
  total: string;
}

export interface UnlockSeriesPoint {
  t: number;
  unlocked: bigint;
}

const parseAmount = (value: string, field: string) => {
  if (!/^\d+$/.test(value)) {
    throw new InvalidVestingScheduleError(`${field} is not an integer`);
  }
  return BigInt(value);
};

const parseMs = (value: string, field: string) => {
  if (!/^-?\d+$/.test(value)) {
    throw new InvalidVestingScheduleError(
      `${field} is not an integer timestamp`
    );
  }
  return BigInt(value);
};

const byTime = (left: bigint, right: bigint) => {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
};

const toChartTime = (ms: bigint) => {
  const asNumber = Number(ms);
  if (!Number.isSafeInteger(asNumber)) {
    throw new InvalidVestingScheduleError(
      'timestamp is outside the safe chart range'
    );
  }
  return asNumber;
};

export const vestingMsToDate = (value: string): Date =>
  new Date(toChartTime(parseMs(value, 'timestamp')));

export const vestedAmount = (
  schedule: VestingUnlockSchedule,
  atMs: bigint
): bigint => {
  const start = parseMs(schedule.start, 'start');
  const cliff = parseMs(schedule.cliff, 'cliff');
  const end = parseMs(schedule.end, 'end');
  const total = parseAmount(schedule.total, 'total');

  if (start > cliff || cliff > end || start >= end) {
    throw new InvalidVestingScheduleError(
      'schedule must have start <= cliff <= end and start < end'
    );
  }
  if (atMs < cliff) return BigInt(0);
  if (atMs >= end) return total;

  return (total * (atMs - start)) / (end - start);
};

const sumVested = (
  schedules: VestingUnlockSchedule[],
  atMs: bigint,
  holdCliffAt?: bigint
) =>
  schedules.reduce((sum, schedule) => {
    if (
      holdCliffAt !== undefined &&
      parseMs(schedule.cliff, 'cliff') === holdCliffAt
    ) {
      return sum;
    }
    return sum + vestedAmount(schedule, atMs);
  }, BigInt(0));

export const buildUnlockSeries = (
  schedules: VestingUnlockSchedule[],
  nowMs: bigint
): UnlockSeriesPoint[] => {
  if (schedules.length === 0) return [];

  schedules.forEach((schedule) => {
    vestedAmount(schedule, nowMs);
  });

  const times = new Set<bigint>([nowMs]);
  schedules.forEach((schedule) => {
    times.add(parseMs(schedule.start, 'start'));
    times.add(parseMs(schedule.cliff, 'cliff'));
    times.add(parseMs(schedule.end, 'end'));
  });

  const events = [...times].sort(byTime);
  const first = events[0];
  const last = events[events.length - 1];
  const day = BigInt(24 * 60 * 60 * 1000);
  if (first !== undefined && last !== undefined && last > first) {
    const spanDays = (last - first) / day;
    if (spanDays > BigInt(200 * 366)) {
      throw new InvalidVestingScheduleError(
        'vesting span is too long to chart'
      );
    }
    for (let time = first + day; time < last; time += day) {
      times.add(time);
    }
  }

  return [...times].sort(byTime).flatMap((time) => {
    const t = toChartTime(time);
    const before = sumVested(schedules, time, time);
    const after = sumVested(schedules, time);

    if (before === after) {
      return [{ t, unlocked: after }];
    }

    return [
      { t, unlocked: before },
      { t, unlocked: after }
    ];
  });
};
