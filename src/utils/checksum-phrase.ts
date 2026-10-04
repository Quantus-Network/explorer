import { addressToChecksum, loadWordList } from 'human-readable-checksum';

let wordList: string[] = [];

export const checksumPhrase = async (address: string) => {
  if (wordList.length === 0) wordList = loadWordList();

  const words = await addressToChecksum(address, wordList);
  return words.join('-');
};
