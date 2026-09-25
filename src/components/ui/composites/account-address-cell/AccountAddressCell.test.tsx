import { render, waitFor } from '@testing-library/react';
import { JSDOM } from 'jsdom';

import { CheckphraseReadyProvider } from '@/components/ui/composites/checkphrase-ready/CheckphraseReady';
import { getChecksum } from '@/utils/get-checksum';

import { AccountAddressCell } from './AccountAddressCell';

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

jest.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    ...props
  }: {
    children: React.ReactNode;
    to: string;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  )
}));

jest.mock('@/utils/get-checksum', () => ({
  getChecksum: jest.fn()
}));

const getChecksumMock = getChecksum as jest.Mock;

const ADDRESS = 'qz1234567890address';
const CHECK_PHRASE = 'alpha-bravo-charlie';

describe('AccountAddressCell', () => {
  it('shows the address immediately and skeletons only the check phrase', async () => {
    let resolveChecksum: (value: string) => void = () => {};
    getChecksumMock.mockReturnValue(
      new Promise((resolve) => {
        resolveChecksum = resolve;
      })
    );

    const view = render(
      <AccountAddressCell
        address={ADDRESS}
        href={`/accounts/${ADDRESS}`}
        text="qz1234....dress"
      />
    );

    expect(view.getByRole('link', { name: 'qz1234....dress' })).toBeTruthy();
    expect(
      view.getByRole('status', { name: 'Loading check phrase' })
    ).toBeTruthy();
    expect(view.queryByText(CHECK_PHRASE)).toBeNull();

    resolveChecksum(CHECK_PHRASE);

    await waitFor(() => {
      expect(view.getByText(CHECK_PHRASE)).toBeTruthy();
    });

    expect(
      view.queryByRole('status', { name: 'Loading check phrase' })
    ).toBeNull();
    expect(view.getByRole('link', { name: 'qz1234....dress' })).toBeTruthy();
    expect(
      view.getAllByRole('button', { name: 'Copy to clipboard' })
    ).toHaveLength(2);
  });

  it('does not start the check phrase until table data is ready', async () => {
    getChecksumMock.mockClear();
    getChecksumMock.mockReturnValue(Promise.resolve(CHECK_PHRASE));

    const view = render(
      <CheckphraseReadyProvider ready={false}>
        <AccountAddressCell address={ADDRESS} href={`/accounts/${ADDRESS}`} />
      </CheckphraseReadyProvider>
    );

    await waitFor(() => {
      expect(view.getByRole('status', { name: 'Loading check phrase' })).toBeTruthy();
    });
    expect(getChecksumMock).not.toHaveBeenCalled();

    view.rerender(
      <CheckphraseReadyProvider ready>
        <AccountAddressCell address={ADDRESS} href={`/accounts/${ADDRESS}`} />
      </CheckphraseReadyProvider>
    );

    await waitFor(() => {
      expect(getChecksumMock).toHaveBeenCalledWith(ADDRESS);
    });
  });
});
