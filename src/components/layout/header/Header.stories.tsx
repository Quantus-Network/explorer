import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Header, type HeaderProps } from './Header';

const meta: Meta<HeaderProps> = {
  title: 'Components/Layout/Header',
  component: Header,
  parameters: {
    layout: 'centered'
  },
  argTypes: {}
};

export default meta;

type Story = StoryObj<HeaderProps>;

export const Default: Story = {
  args: {}
};
