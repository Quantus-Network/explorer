import { addressToChecksum } from 'human-readable-checksum';

import { getChecksum } from './get-checksum';

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

jest.mock('human-readable-checksum', () => ({
  loadWordList: () => ['word'],
  addressToChecksum: jest.fn(() => [
    'alpha',
    'bravo',
    'charlie',
    'delta',
    'echo'
  ])
}));

const addressToChecksumMock = addressToChecksum as jest.Mock;

describe('getChecksum', () => {
  it('does not compute the check phrase in the turn that starts loading', async () => {
    addressToChecksumMock.mockClear();

    const pending = getChecksum('qz-defer-1');

    expect(addressToChecksumMock).not.toHaveBeenCalled();

    await expect(pending).resolves.toBe('alpha-bravo-charlie-delta-echo');
    expect(addressToChecksumMock).toHaveBeenCalledTimes(1);
  });

  it('computes a repeated address once', async () => {
    addressToChecksumMock.mockClear();

    const [first, second] = await Promise.all([
      getChecksum('qz-shared'),
      getChecksum('qz-shared')
    ]);

    expect(first).toBe('alpha-bravo-charlie-delta-echo');
    expect(second).toBe(first);
    expect(addressToChecksumMock).toHaveBeenCalledTimes(1);
  });

  it('reuses a check phrase saved in localStorage without computing', async () => {
    localStorage.setItem(
      'quantus:checkphrase:qz-stored',
      'alpha-bravo-charlie-delta-echo'
    );
    addressToChecksumMock.mockClear();

    await expect(getChecksum('qz-stored')).resolves.toBe(
      'alpha-bravo-charlie-delta-echo'
    );
    expect(addressToChecksumMock).not.toHaveBeenCalled();
  });

  it('saves a newly computed check phrase in localStorage', async () => {
    await getChecksum('qz-new-store');

    expect(localStorage.getItem('quantus:checkphrase:qz-new-store')).toBe(
      'alpha-bravo-charlie-delta-echo'
    );
  });
});
