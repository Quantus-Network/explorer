import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y'
  ],
  framework: '@storybook/nextjs-vite'
};

export default config;
