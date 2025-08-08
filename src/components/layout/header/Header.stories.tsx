import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header, type HeaderProps } from './Header';

const meta: Meta<HeaderProps> = {
  title: 'Components/Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {}
};

export default meta;

type Story = StoryObj<HeaderProps>;

export const Default: Story = {
  args: {}
};
