import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchBox, type SearchBoxProps } from './SearchBox';

const meta: Meta<SearchBoxProps> = {
  title: 'Components/UI/Composites/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md']
    }
  }
};

export default meta;

type Story = StoryObj<SearchBoxProps>;

const handlers = {
  onKeywordChange(val: string) {
    if (!val) return;
    console.log(val);
  },
  onSearch(val: string) {
    if (!val) return;
    console.log(val);
  }
};

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Search by hash, address, block height, or transaction ID…',
    ...handlers
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    buttonVariant: 'ghost',
    placeholder: 'Search by hash, address, block height…',
    ...handlers
  },
  decorators: [
    (Story) => (
      <div className="w-[260px]">
        <Story />
      </div>
    )
  ]
};

export const Default: Story = Medium;
