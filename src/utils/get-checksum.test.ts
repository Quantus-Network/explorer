import { createChecksumQueue } from './get-checksum';

const store = new Map<string, string>();
Object.assign(globalThis, {
  localStorage: {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => {
      store.clear();
    }
  }
});

type PostedChecksum = {
  id: number;
  address: string;
};

type FakeChecksumWorker = {
  onmessage: ((event: MessageEvent) => void) | null;
  onerror: ((event: ErrorEvent) => void) | null;
  posted: PostedChecksum[];
  sent: PostedChecksum[];
  terminated: boolean;
  postMessage: (data: PostedChecksum) => void;
  terminate: () => void;
};

const createFakeWorker = (): FakeChecksumWorker => {
  const worker: FakeChecksumWorker = {
    onmessage: null,
    onerror: null,
    posted: [],
    sent: [],
    terminated: false,
    postMessage(data) {
      worker.posted.push(data);
      worker.sent.push(data);
    },
    terminate() {
      worker.terminated = true;
    }
  };

  return worker;
};

describe('getChecksum', () => {
  let created: FakeChecksumWorker[] = [];
  let getChecksum: (
    address?: string,
    signal?: AbortSignal
  ) => Promise<string | null>;

  const latestWorker = () => {
    const worker = created.at(-1);
    if (!worker) throw new Error('checksum worker was not created');
    return worker;
  };

  const respond = (data: { checksum: string } | { error: string }) => {
    const worker = latestWorker();
    const message = worker.posted.shift();
    if (!message) throw new Error('No checksum job is waiting');
    worker.onmessage?.({
      data: { id: message.id, ...data }
    } as MessageEvent);
  };

  beforeEach(() => {
    store.clear();
    created = [];
    ({ getChecksum } = createChecksumQueue(() => {
      const worker = createFakeWorker();
      created.push(worker);
      return worker;
    }));
  });

  it('returns nothing for a missing address', async () => {
    await expect(getChecksum()).resolves.toBeNull();
    expect(created).toHaveLength(0);
  });

  it('waits for the worker instead of resolving in the turn that starts loading', async () => {
    let settled = false;
    const pending = getChecksum('qz-defer').then(() => {
      settled = true;
    });

    await Promise.resolve();

    expect(settled).toBe(false);
    expect(latestWorker().sent.map((job) => job.address)).toEqual(['qz-defer']);

    respond({ checksum: 'alpha-bravo-charlie-delta-echo' });
    await pending;
    expect(settled).toBe(true);
  });

  it('sends one address to the worker at a time', async () => {
    const first = getChecksum('qz-seq-a');
    const second = getChecksum('qz-seq-b');

    expect(latestWorker().sent.map((job) => job.address)).toEqual(['qz-seq-a']);

    respond({ checksum: 'phrase-a' });
    await expect(first).resolves.toBe('phrase-a');
    expect(latestWorker().sent.map((job) => job.address)).toEqual([
      'qz-seq-a',
      'qz-seq-b'
    ]);

    respond({ checksum: 'phrase-b' });
    await expect(second).resolves.toBe('phrase-b');
  });

  it('computes a repeated address once', async () => {
    const first = getChecksum('qz-shared');
    const second = getChecksum('qz-shared');

    expect(latestWorker().sent).toHaveLength(1);
    respond({ checksum: 'alpha-bravo-charlie-delta-echo' });

    await expect(first).resolves.toBe('alpha-bravo-charlie-delta-echo');
    await expect(second).resolves.toBe('alpha-bravo-charlie-delta-echo');

    await expect(getChecksum('qz-shared')).resolves.toBe(
      'alpha-bravo-charlie-delta-echo'
    );
    expect(latestWorker().sent).toHaveLength(1);
  });

  it('still resolves a shared address when one caller leaves', async () => {
    const controller = new AbortController();
    const left = getChecksum('qz-shared-live', controller.signal);
    const stayed = getChecksum('qz-shared-live');

    controller.abort();

    await expect(left).rejects.toMatchObject({ name: 'AbortError' });
    respond({ checksum: 'alpha-bravo-charlie-delta-echo' });
    await expect(stayed).resolves.toBe('alpha-bravo-charlie-delta-echo');
    expect(latestWorker().sent).toHaveLength(1);
  });

  it('does not send an address that left before its turn', async () => {
    const first = getChecksum('qz-hold');
    const controller = new AbortController();
    const skipped = getChecksum('qz-offscreen', controller.signal);

    controller.abort();

    await expect(skipped).rejects.toMatchObject({ name: 'AbortError' });
    expect(latestWorker().sent.map((job) => job.address)).toEqual(['qz-hold']);

    respond({ checksum: 'phrase-hold' });
    await expect(first).resolves.toBe('phrase-hold');
    expect(latestWorker().sent.map((job) => job.address)).toEqual(['qz-hold']);
  });

  it('keeps a phrase that finished after its caller left', async () => {
    const controller = new AbortController();
    const pending = getChecksum('qz-late', controller.signal);

    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });

    respond({ checksum: 'alpha-bravo-charlie-delta-echo' });
    await expect(getChecksum('qz-late')).resolves.toBe(
      'alpha-bravo-charlie-delta-echo'
    );
    expect(latestWorker().sent).toHaveLength(1);
  });

  it('reuses a check phrase saved in localStorage without computing', async () => {
    localStorage.setItem(
      'quantus:checkphrase:qz-stored',
      'alpha-bravo-charlie-delta-echo'
    );

    await expect(getChecksum('qz-stored')).resolves.toBe(
      'alpha-bravo-charlie-delta-echo'
    );
    expect(created).toHaveLength(0);
  });

  it('saves a newly computed check phrase in localStorage', async () => {
    const pending = getChecksum('qz-new-store');
    respond({ checksum: 'alpha-bravo-charlie-delta-echo' });
    await pending;

    expect(localStorage.getItem('quantus:checkphrase:qz-new-store')).toBe(
      'alpha-bravo-charlie-delta-echo'
    );
  });

  it('rejects a derivation error from the worker and continues the queue', async () => {
    const pending = getChecksum('qz-derive-error');
    const next = getChecksum('qz-after-derive-error');

    respond({ error: 'Web Crypto is not available' });

    await expect(pending).rejects.toThrow('Web Crypto is not available');
    expect(latestWorker().posted.map((job) => job.address)).toEqual([
      'qz-after-derive-error'
    ]);

    respond({ checksum: 'alpha-bravo-charlie-delta-echo' });
    await expect(next).resolves.toBe('alpha-bravo-charlie-delta-echo');
  });

  it('reports a worker failure without computing on the page', async () => {
    const pending = getChecksum('qz-worker-fail');
    const failedWorker = latestWorker();

    failedWorker.onerror?.({} as ErrorEvent);

    await expect(pending).rejects.toThrow('Check phrase worker failed');
    expect(failedWorker.terminated).toBe(true);

    const next = getChecksum('qz-worker-next');
    expect(latestWorker()).not.toBe(failedWorker);
    expect(latestWorker().sent.map((job) => job.address)).toEqual([
      'qz-worker-next'
    ]);

    respond({ checksum: 'alpha-bravo-charlie-delta-echo' });
    await expect(next).resolves.toBe('alpha-bravo-charlie-delta-echo');
  });
});
