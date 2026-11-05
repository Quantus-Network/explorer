import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';

import { SEO } from './SEO';

const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>');
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  Element: dom.window.Element,
  Node: dom.window.Node,
  navigator: dom.window.navigator,
  IS_REACT_ACT_ENVIRONMENT: true
});

describe('SEO', () => {
  it('sets the page title and a self canonical when one is provided', () => {
    render(
      <SEO title="Blocks" canonical="https://explorer.quantus.com/blocks" />
    );

    expect(document.title).toBe('Blocks | Quantus Explorer');
    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe('https://explorer.quantus.com/blocks');
    expect(
      document.head
        .querySelector('meta[property="og:url"]')
        ?.getAttribute('content')
    ).toBe('https://explorer.quantus.com/blocks');
  });

  it('does not point a noindex page at the home page', () => {
    render(<SEO noIndex />);

    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(document.querySelector('meta[property="og:url"]')).toBeNull();
    expect(
      document.querySelector('meta[name="robots"]')?.getAttribute('content')
    ).toBe('noindex');
  });
});
