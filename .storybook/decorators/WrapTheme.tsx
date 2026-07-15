import type { Decorator } from '@storybook/react-vite';
import * as React from 'react';

/** App is dark-only; keep Storybook in sync with `index.html` (`class="dark"`). */
export const WrapTheme: Decorator = (Story) => {
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  }, []);

  return <Story />;
};
