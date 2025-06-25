import { addressToChecksum, loadBip39List } from 'human-readable-checksum';

let wordList: string[] = [];

export const getChecksum = async (address?: string): Promise<string | null> => {
  if (!address) return null;

  /** Load the bip39 word list, will be cached so only need to load once. */
  if (wordList.length === 0) wordList = await loadBip39List();

  const checksum = addressToChecksum(address, wordList).join('-');

  return checksum;
};
