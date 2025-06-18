import type { Decorator, StoryContext } from '@storybook/nextjs-vite';
import * as React from 'react';

export const WrapTheme: Decorator = (Story, context: StoryContext) => {
  const { theme } = context.globals as { theme: 'light' | 'dark' };

  React.useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return <Story />;
};
