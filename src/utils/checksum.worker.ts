import { checksumPhrase } from './checksum-phrase';

type ChecksumRequest = {
  id: number;
  address: string;
};

type ChecksumResponse =
  | { id: number; checksum: string }
  | { id: number; error: string };

const scope = globalThis as typeof globalThis & {
  onmessage: ((event: MessageEvent<ChecksumRequest>) => void) | null;
  postMessage: (message: ChecksumResponse) => void;
};

const failureMessage = (caught: unknown) => {
  if (caught instanceof Error && caught.message) return caught.message;
  return 'Failed to load check phrase';
};

scope.onmessage = (event) => {
  const { id, address } = event.data;

  checksumPhrase(address)
    .then((checksum) => {
      scope.postMessage({ id, checksum });
    })
    .catch((caught: unknown) => {
      scope.postMessage({ id, error: failureMessage(caught) });
    });
};
