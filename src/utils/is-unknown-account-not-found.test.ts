import * as ss58 from '@subsquid/ss58-codec';

import { isUnknownAccountNotFound } from './is-unknown-account-not-found';

const unusedAddress = ss58.encode({
  prefix: 189,
  bytes: new Uint8Array(32).fill(1)
});

describe('isUnknownAccountNotFound', () => {
  it('does not 404 a valid SS58 id when Subsquid has no account row', () => {
    expect(
      isUnknownAccountNotFound({
        loading: false,
        account: null,
        accountId: unusedAddress
      })
    ).toBe(false);
  });

  it('404s an invalid id when Subsquid has no account row', () => {
    expect(
      isUnknownAccountNotFound({
        loading: false,
        account: null,
        accountId: 'not-an-address'
      })
    ).toBe(true);
  });
});
