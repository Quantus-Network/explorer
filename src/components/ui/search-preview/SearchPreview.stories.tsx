import type { Meta, StoryObj } from '@storybook/react';

import { SearchPreview, type SearchPreviewProps } from './SearchPreview';

const meta: Meta<SearchPreviewProps> = {
  title: 'Components/UI/SearchPreview',
  component: SearchPreview,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {}
};

export default meta;

type Story = StoryObj<SearchPreviewProps>;

export const Default: Story = {
  args: {
    onKeywordChange(val, e) {
      if (!val) return;

      console.log(val);
    },
    onSearch(val) {
      if (!val) return;

      console.log(val);
    }
  }
};
