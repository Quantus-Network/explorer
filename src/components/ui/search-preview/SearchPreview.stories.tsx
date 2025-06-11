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
    onSearch(val, e) {
      if (!val) return;

      console.log(val);
    }
  }
};
