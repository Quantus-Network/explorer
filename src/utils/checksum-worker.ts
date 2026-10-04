export const createChecksumWorker = (): Worker =>
  new Worker(new URL('./checksum.worker.ts', import.meta.url), {
    type: 'module'
  });
