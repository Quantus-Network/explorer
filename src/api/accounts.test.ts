import { print } from 'graphql';

import {
  GET_ACCOUNT_BY_ID,
  GET_ACCOUNTS,
  GET_FILTERED_ACCOUNTS
} from './accounts';

describe('account queries', () => {
  it.each([
    ['GetAccounts', GET_ACCOUNTS],
    ['GetFilteredAccounts', GET_FILTERED_ACCOUNTS],
    ['GetAccountById', GET_ACCOUNT_BY_ID]
  ] as const)(
    '%s reads has_mined_blocks instead of peeking minedBlocks',
    (_name, document) => {
      const query = print(document);

      expect(query).toContain('has_mined_blocks');
      expect(query).not.toContain('minedBlocks');
    }
  );
});
