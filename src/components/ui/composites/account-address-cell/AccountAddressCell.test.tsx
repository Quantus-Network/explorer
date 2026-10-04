import { act, render, waitFor } from '@testing-library/react';
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

jest.mock('@/components/ui/composites/text-with-copy/TextWithCopy', () => ({
  TextWithCopy: ({ text }: { text: string }) => {
    ((globalThis as { __checkPhrases?: string[] }).__checkPhrases ??= []).push(
      text
    );
    return (
      <div>
        <p>{text}</p>
        <button type="button">Copy to clipboard</button>
      </div>
    );
  }
}));

const renderedPhrases = () => {
  const holder = globalThis as { __checkPhrases?: string[] };
  holder.__checkPhrases ??= [];
  return holder.__checkPhrases;
};

const getChecksumMock = getChecksum as jest.Mock;

const ADDRESS = 'qz1234567890address';
const CHECK_PHRASE = 'alpha-bravo-charlie';

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  static visible = true;

  callback: IntersectionObserverCallback;

  target: Element | null = null;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe = (target: Element) => {
    this.target = target;
    this.emit(MockIntersectionObserver.visible);
  };

  emit(isIntersecting: boolean) {
    if (!this.target) return;
    this.callback(
      [
        {
          isIntersecting,
          target: this.target
        } as IntersectionObserverEntry
      ],
      this as unknown as IntersectionObserver
    );
  }

  unobserve() {}

  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  root = null;

  rootMargin = '0px';

  thresholds = [0];
}

describe('AccountAddressCell', () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    MockIntersectionObserver.visible = true;
    Object.assign(globalThis, {
      IntersectionObserver: MockIntersectionObserver
    });
  });

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
      expect(
        view.getByRole('status', { name: 'Loading check phrase' })
      ).toBeTruthy();
    });
    expect(getChecksumMock).not.toHaveBeenCalled();

    view.rerender(
      <CheckphraseReadyProvider ready>
        <AccountAddressCell address={ADDRESS} href={`/accounts/${ADDRESS}`} />
      </CheckphraseReadyProvider>
    );

    await waitFor(() => {
      expect(getChecksumMock).toHaveBeenCalledWith(
        ADDRESS,
        expect.any(AbortSignal)
      );
    });
  });

  it('computes a check phrase only after the address is on screen', async () => {
    MockIntersectionObserver.visible = false;
    getChecksumMock.mockClear();
    getChecksumMock.mockReturnValue(new Promise(() => {}));

    render(
      <AccountAddressCell address={ADDRESS} href={`/accounts/${ADDRESS}`} />
    );

    await waitFor(() => {
      expect(MockIntersectionObserver.instances.length).toBeGreaterThan(0);
    });
    expect(getChecksumMock).not.toHaveBeenCalled();

    const observer = MockIntersectionObserver.instances.at(-1);
    if (!observer) throw new Error('expected an intersection observer');

    await act(async () => {
      observer.emit(true);
    });

    await waitFor(() => {
      expect(getChecksumMock).toHaveBeenCalledWith(
        ADDRESS,
        expect.any(AbortSignal)
      );
    });
  });

  it('stops a check phrase that leaves the screen before it finishes', async () => {
    let signal: AbortSignal | undefined;
    getChecksumMock.mockImplementation(
      (_address: string, next?: AbortSignal) => {
        signal = next;
        return new Promise(() => {});
      }
    );

    render(
      <AccountAddressCell address={ADDRESS} href={`/accounts/${ADDRESS}`} />
    );

    await waitFor(() => {
      expect(signal?.aborted).toBe(false);
    });

    const observer = MockIntersectionObserver.instances.at(-1);
    if (!observer) throw new Error('expected an intersection observer');

    await act(async () => {
      observer.emit(false);
    });

    expect(signal?.aborted).toBe(true);
  });

  it('keeps a resolved check phrase visible when the address leaves and returns', async () => {
    let calls = 0;
    let resolveChecksum: (value: string) => void = () => {};
    getChecksumMock.mockImplementation(() => {
      calls += 1;
      if (calls === 1) {
        return new Promise((resolve) => {
          resolveChecksum = resolve;
        });
      }
      return new Promise(() => {});
    });

    const view = render(
      <AccountAddressCell address={ADDRESS} href={`/accounts/${ADDRESS}`} />
    );

    await waitFor(() => {
      expect(getChecksumMock).toHaveBeenCalled();
    });
    resolveChecksum(CHECK_PHRASE);

    await waitFor(() => {
      expect(view.getByText(CHECK_PHRASE)).toBeTruthy();
    });

    const observer = MockIntersectionObserver.instances.at(-1);
    if (!observer) throw new Error('expected an intersection observer');

    await act(async () => {
      observer.emit(false);
    });
    expect(view.getByText(CHECK_PHRASE)).toBeTruthy();

    await act(async () => {
      observer.emit(true);
    });

    expect(
      view.queryByRole('status', { name: 'Loading check phrase' })
    ).toBeNull();
    expect(view.getByText(CHECK_PHRASE)).toBeTruthy();
  });

  it('does not offer the previous check phrase after the address changes', async () => {
    const nextAddress = 'qz0987654321address';
    const nextPhrase = 'delta-echo-foxtrot';
    let resolveNext: (value: string) => void = () => {};

    getChecksumMock.mockImplementation((id: string) => {
      if (id === ADDRESS) return Promise.resolve(CHECK_PHRASE);
      return new Promise((resolve) => {
        resolveNext = resolve;
      });
    });

    const view = render(
      <AccountAddressCell address={ADDRESS} href={`/accounts/${ADDRESS}`} />
    );

    await waitFor(() => {
      expect(view.getByText(CHECK_PHRASE)).toBeTruthy();
    });

    renderedPhrases().length = 0;

    view.rerender(
      <AccountAddressCell
        address={nextAddress}
        href={`/accounts/${nextAddress}`}
      />
    );

    expect(renderedPhrases()).not.toContain(CHECK_PHRASE);
    expect(view.queryByText(CHECK_PHRASE)).toBeNull();
    expect(view.getByRole('link', { name: nextAddress })).toBeTruthy();
    expect(
      view.getByRole('status', { name: 'Loading check phrase' })
    ).toBeTruthy();

    resolveNext(nextPhrase);

    await waitFor(() => {
      expect(view.getByText(nextPhrase)).toBeTruthy();
    });
    expect(view.queryByText(CHECK_PHRASE)).toBeNull();
  });
});
