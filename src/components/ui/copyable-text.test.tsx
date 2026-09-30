import { JSDOM } from 'jsdom';
import { render } from '@testing-library/react';

import { CopyableText } from './copyable-text';

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

const HOVER_FINE = '[@media(hover:hover)_and_(pointer:fine)]';

describe('CopyableText', () => {
  it('stays visible on touch and only hides on devices that can hover', () => {
    const { getByRole } = render(<CopyableText text="abc" />);

    const classes = getByRole('button', {
      name: 'Copy to clipboard'
    }).className.split(/\s+/);

    expect(classes).toContain('opacity-100');
    expect(classes).not.toContain('opacity-0');
    expect(classes).not.toContain('group-hover:opacity-100');
    expect(classes).toContain(`${HOVER_FINE}:opacity-0`);
    expect(classes).toContain(`${HOVER_FINE}:pointer-events-none`);
    expect(classes).toContain(`${HOVER_FINE}:group-hover:opacity-100`);
    expect(classes).toContain(`${HOVER_FINE}:group-hover:pointer-events-auto`);
    expect(classes).toContain(`${HOVER_FINE}:focus-visible:opacity-100`);
    expect(classes).toContain(
      `${HOVER_FINE}:focus-visible:pointer-events-auto`
    );
  });
});
