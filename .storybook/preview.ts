import '../src/app/globals.css';

import type { Preview } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initialize, mswLoader } from 'msw-storybook-addon';

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
        { name: 'light', value: '#F1F1F1' },
        { name: 'dark', value: '#131313' }
      ]
    }
  },
  loaders: [mswLoader],
  // decorators: [WrapTheme],
  globalTypes: {
    theme: {
      name: 'theme',
      description: 'Select light or dark theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: ['light'],
        showName: true
      }
    }
  }
};

export default preview;
