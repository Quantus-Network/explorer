import type { Decorator, StoryContext } from '@storybook/react-vite';
import { NuqsAdapter } from 'nuqs/adapters/react';

export const WithProviders: Decorator = (Story, context: StoryContext) => {
  return (
    <NuqsAdapter>
      <Story />
    </NuqsAdapter>
  );
};
