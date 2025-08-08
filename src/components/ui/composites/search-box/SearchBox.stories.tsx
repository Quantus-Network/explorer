import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchBox, type SearchBoxProps } from './SearchBox';

const meta: Meta<SearchBoxProps> = {
  title: 'Components/UI/Composites/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {}
};

export default meta;

type Story = StoryObj<SearchBoxProps>;

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
