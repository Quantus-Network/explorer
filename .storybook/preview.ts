import '../src/app/globals.scss';

import type { Preview } from '@storybook/nextjs-vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initialize, mswLoader } from 'msw-storybook-addon';

import { WrapTheme } from './decorators';

initialize();

const viewports = {
  extraSmall: {
    name: 'Small phone',
    styles: {
      width: '320px',
      height: '568px'
    },
    type: 'phone'
  },
  small: {
    name: 'Small tablet',
    styles: {
      width: '576px',
      height: '1024px'
    },
    type: 'tablet'
  },
  medium: {
    name: 'Medium tablet',
    styles: {
      width: '768px',
      height: '1024px'
    },
    type: 'tablet'
  },
  large: {
    name: 'Large tablet',
    styles: {
      width: '1024px',
      height: '1366px'
    },
    type: 'tablet'
  }
};

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true
    },
    viewport: {
      viewports
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fef2f2' },
        { name: 'dark', value: '#171717' }
      ]
    }
  },
  loaders: [mswLoader],
  decorators: [WrapTheme],
  globalTypes: {
    theme: {
      name: 'theme',
      description: 'Select light or dark theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: ['light', 'dark'],
        showName: true
      }
    }
  }
};

export default preview;
