import { addressToChecksum, loadWordList } from 'human-readable-checksum';

import { checksumPhrase } from './checksum-phrase';

jest.mock('human-readable-checksum', () => ({
  loadWordList: jest.fn(() => ['word']),
  addressToChecksum: jest.fn(() =>
    Promise.resolve(['alpha', 'bravo', 'charlie', 'delta', 'echo'])
  )
}));

const addressToChecksumMock = addressToChecksum as jest.Mock;
const loadWordListMock = loadWordList as jest.Mock;

describe('checksumPhrase', () => {
  it('awaits the async check phrase and joins the words', async () => {
    addressToChecksumMock.mockClear();

    await expect(checksumPhrase('qz-async')).resolves.toBe(
      'alpha-bravo-charlie-delta-echo'
    );
    expect(addressToChecksumMock).toHaveBeenCalledWith('qz-async', ['word']);

    const loadsAfterFirst = loadWordListMock.mock.calls.length;
    await expect(checksumPhrase('qz-async-again')).resolves.toBe(
      'alpha-bravo-charlie-delta-echo'
    );
    expect(loadWordListMock.mock.calls.length).toBe(loadsAfterFirst);
  });

  it('rejects when the check phrase cannot be derived', async () => {
    addressToChecksumMock.mockRejectedValueOnce(
      new Error('Web Crypto is not available')
    );

    await expect(checksumPhrase('qz-derive-fail')).rejects.toThrow(
      'Web Crypto is not available'
    );
  });
});
