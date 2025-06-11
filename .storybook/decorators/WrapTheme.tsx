import type { Decorator, StoryContext } from '@storybook/react';
import * as React from 'react';

export const WrapTheme: Decorator = (Story, context: StoryContext) => {
  const { theme } = context.globals as { theme: 'light' | 'dark' };

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return <Story />;
};
