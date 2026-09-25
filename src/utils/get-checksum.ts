import { addressToChecksum, loadWordList } from 'human-readable-checksum';

const STORAGE_PREFIX = 'quantus:checkphrase:';

let wordList: string[] = [];
const cache = new Map<string, string>();
const inflight = new Map<string, Promise<string | null>>();

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

type Job = {
  address: string;
  resolve: (value: string | null) => void;
  reject: (error: unknown) => void;
};

const queue: Job[] = [];
let scheduled = false;

const compute = (address: string) => {
  const cached = cache.get(address);
  if (cached) return cached;

  if (wordList.length === 0) wordList = loadWordList();

  const checksum = addressToChecksum(address, wordList).join('-');
  cache.set(address, checksum);
  writeStored(address, checksum);
  return checksum;
};

const drainOne = () => {
  scheduled = false;
  const job = queue.shift();
  if (!job) return;

  try {
    job.resolve(compute(job.address));
  } catch (error) {
    job.reject(error);
  }

  if (queue.length > 0) scheduleDrain();
};

const scheduleDrain = () => {
  if (scheduled) return;
  scheduled = true;
  setTimeout(drainOne, 0);
};

export const getChecksum = (address?: string): Promise<string | null> => {
  if (!address) return Promise.resolve(null);

  const cached = cache.get(address);
  if (cached) return Promise.resolve(cached);

  const stored = readStored(address);
  if (stored) {
    cache.set(address, stored);
    return Promise.resolve(stored);
  }

  const existing = inflight.get(address);
  if (existing) return existing;

  const promise = new Promise<string | null>((resolve, reject) => {
    queue.push({
      address,
      resolve: (value) => {
        inflight.delete(address);
        resolve(value);
      },
      reject: (error) => {
        inflight.delete(address);
        reject(error);
      }
    });
    scheduleDrain();
  });

  inflight.set(address, promise);
  return promise;
};
