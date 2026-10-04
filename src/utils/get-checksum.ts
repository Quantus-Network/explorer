import { createChecksumWorker } from './checksum-worker';

const STORAGE_PREFIX = 'quantus:checkphrase:';

export type ChecksumComputeWorker = {
  onmessage: ((event: MessageEvent) => void) | null;
  onerror: ((event: ErrorEvent) => void) | null;
  postMessage: (message: { id: number; address: string }) => void;
  terminate: () => void;
};

type Waiter = {
  signal?: AbortSignal;
  resolve: (value: string | null) => void;
  reject: (error: unknown) => void;
};

type Job = {
  address: string;
  waiters: Waiter[];
};

type ChecksumResponse =
  | { id: number; checksum: string }
  | { id: number; error: string };

const storageKey = (address: string) => `${STORAGE_PREFIX}${address}`;

const readStored = (address: string) => {
  try {
    return localStorage.getItem(storageKey(address));
  } catch {
    return null;
  }
};

const writeStored = (address: string, checksum: string) => {
  try {
    localStorage.setItem(storageKey(address), checksum);
  } catch {
    // The phrase is already computed. A storage failure only means the next visit recomputes it.
  }
};

const abortError = () =>
  new DOMException('The operation was aborted.', 'AbortError');

const workerFailure = (event: ErrorEvent) => {
  if (event.message) return new Error(event.message);
  return new Error('Check phrase worker failed');
};

const isChecksumResponse = (value: unknown): value is ChecksumResponse => {
  if (typeof value !== 'object' || value === null || !('id' in value)) {
    return false;
  }

  const { id } = value;
  if (typeof id !== 'number') return false;
  if ('checksum' in value && typeof value.checksum === 'string') return true;
  if ('error' in value && typeof value.error === 'string' && value.error) {
    return true;
  }

  return false;
};

// The worker hashes one address at a time. A queued address is dropped once
// every caller has left the screen.
export const createChecksumQueue = (
  createWorker: () => ChecksumComputeWorker
) => {
  const cache = new Map<string, string>();
  const jobsByAddress = new Map<string, Job>();
  const queue: Job[] = [];
  const settled = new WeakSet<Waiter>();
  let worker: ChecksumComputeWorker | null = null;
  let current: { id: number; job: Job } | null = null;
  let nextId = 0;
  let pump = () => {};

  const isActive = (waiter: Waiter) =>
    !settled.has(waiter) && !waiter.signal?.aborted;

  const settle = (waiter: Waiter, action: () => void) => {
    if (settled.has(waiter)) return;
    settled.add(waiter);
    action();
  };

  const forget = (job: Job) => {
    if (jobsByAddress.get(job.address) === job) {
      jobsByAddress.delete(job.address);
    }
  };

  const rejectActive = (job: Job, error: unknown) => {
    job.waiters.forEach((waiter) => {
      if (!isActive(waiter)) return;
      settle(waiter, () => waiter.reject(error));
    });
  };

  const resolveActive = (job: Job, checksum: string) => {
    job.waiters.forEach((waiter) => {
      if (!isActive(waiter)) return;
      settle(waiter, () => waiter.resolve(checksum));
    });
  };

  const failWorker = (error: Error) => {
    const failed = worker;
    const running = current;
    current = null;
    worker = null;
    if (failed) {
      failed.onmessage = null;
      failed.onerror = null;
      failed.terminate();
    }

    if (running) {
      forget(running.job);
      rejectActive(running.job, error);
    }

    queue.splice(0, queue.length).forEach((job) => {
      forget(job);
      rejectActive(job, error);
    });
  };

  const handleMessage = (event: MessageEvent) => {
    const running = current;
    if (!running) return;

    const data = isChecksumResponse(event.data) ? event.data : null;
    if (!data || data.id !== running.id) return;

    current = null;
    forget(running.job);

    if ('checksum' in data) {
      cache.set(running.job.address, data.checksum);
      writeStored(running.job.address, data.checksum);
      resolveActive(running.job, data.checksum);
    } else {
      rejectActive(running.job, new Error(data.error));
    }

    pump();
  };

  const ensureWorker = () => {
    if (worker) return worker;

    const created = createWorker();
    created.onmessage = (event) => {
      try {
        handleMessage(event);
      } catch (error) {
        failWorker(
          error instanceof Error
            ? error
            : new Error('Check phrase worker failed')
        );
      }
    };
    created.onerror = (event) => {
      failWorker(workerFailure(event));
    };
    worker = created;
    return created;
  };

  pump = () => {
    if (current) return;

    while (queue.length > 0) {
      const job = queue.shift();
      if (!job) return;

      if (!job.waiters.some(isActive)) {
        forget(job);
        continue;
      }

      const id = nextId;
      nextId += 1;
      current = { id, job };

      try {
        ensureWorker().postMessage({ id, address: job.address });
        return;
      } catch (error) {
        failWorker(
          error instanceof Error
            ? error
            : new Error('Check phrase worker failed')
        );
        return;
      }
    }
  };

  const getChecksum = (address?: string, signal?: AbortSignal) => {
    if (!address) return Promise.resolve(null);
    if (signal?.aborted) return Promise.reject(abortError());

    const cached = cache.get(address) ?? readStored(address);
    if (cached) {
      cache.set(address, cached);
      return Promise.resolve(cached);
    }

    return new Promise<string | null>((resolve, reject) => {
      const waiter: Waiter = { signal, resolve, reject };
      const existing = jobsByAddress.get(address);
      const job = existing ?? { address, waiters: [] };
      job.waiters.push(waiter);

      if (!existing) {
        jobsByAddress.set(address, job);
        queue.push(job);
      }

      if (signal) {
        signal.addEventListener(
          'abort',
          () => {
            settle(waiter, () => waiter.reject(abortError()));
            if (current?.job === job) return;
            if (job.waiters.some(isActive)) return;

            const index = queue.indexOf(job);
            if (index >= 0) queue.splice(index, 1);
            forget(job);
          },
          { once: true }
        );
      }

      pump();
    });
  };

  return { getChecksum };
};

const checksums = createChecksumQueue(createChecksumWorker);

export const getChecksum = (
  address?: string,
  signal?: AbortSignal
): Promise<string | null> => checksums.getChecksum(address, signal);
