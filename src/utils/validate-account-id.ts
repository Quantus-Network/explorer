import * as ss58 from '@subsquid/ss58-codec';

export const validateAccountId = (id: string) => {
  try {
    const address = ss58.decode(id);
    const lengthIsValid = address.bytes.length === 32;
    const checksumIsValid = ss58.encode(address) === id;

    return lengthIsValid && checksumIsValid;
  } catch (error) {
    return false;
  }
};
