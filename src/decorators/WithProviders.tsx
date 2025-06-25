import type { Decorator, StoryContext } from '@storybook/nextjs-vite';
import { NuqsAdapter } from 'nuqs/adapters/next/pages';

export const WithProviders: Decorator = (Story, context: StoryContext) => {
  return (
    <NuqsAdapter>
      <Story />
    </NuqsAdapter>
  );
};
