import type { QueryResult } from '@apollo/client';
import { JSDOM } from 'jsdom';
import { render } from '@testing-library/react';

import type { BlockResponse } from '@/schemas';

import { BlockInformation } from './BlockInformation';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  Element: dom.window.Element,
  Node: dom.window.Node,
  navigator: dom.window.navigator,
  IS_REACT_ACT_ENVIRONMENT: true
});

function blockQuery(
  overrides: Pick<QueryResult<BlockResponse>, 'loading'> & {
    data?: BlockResponse;
  }
) {
  return overrides as QueryResult<BlockResponse>;
}

const block = {
  id: '1',
  hash: '0xabc',
  height: 10,
  timestamp: '2026-01-01T00:00:00.000Z',
  reward: '0',
  mined_by_id: null,
  extrinsics: []
};

describe('BlockInformation treasury reward', () => {
  it('omits treasury reward while the block is loading', () => {
    const view = render(<BlockInformation query={blockQuery({ loading: true })} />);

    expect(view.queryByText('Treasury reward')).toBeNull();
    expect(view.getByText('Miner reward')).toBeTruthy();
  });

  it('omits treasury reward when the block has none', () => {
    const view = render(
      <BlockInformation
        query={blockQuery({
          loading: false,
          data: {
            blocks: [block],
            minerRewards: [],
            rewardTransfers: []
          }
        })}
      />
    );

    expect(view.queryByText('Treasury reward')).toBeNull();
    expect(view.getByText('Miner reward')).toBeTruthy();
  });

  it('renders treasury reward when the block includes one', () => {
    const view = render(
      <BlockInformation
        query={blockQuery({
          loading: false,
          data: {
            blocks: [block],
            minerRewards: [],
            rewardTransfers: [
              {
                amount: '1000000000000',
                detail_id: 'treasury',
                from: null,
                to: { id: 'treasury-account' }
              }
            ]
          }
        })}
      />
    );

    expect(view.getByText('Treasury reward')).toBeTruthy();
    expect(view.getByText('1 QTC')).toBeTruthy();
  });
});
