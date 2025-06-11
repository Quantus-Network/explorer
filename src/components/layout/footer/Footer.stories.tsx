import type { Meta, StoryObj } from '@storybook/react';

import { Footer, type FooterProps } from './Footer';

const meta: Meta<FooterProps> = {
  title: 'Components/Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'centered'
  },
  argTypes: {}
};

export default meta;

type Story = StoryObj<FooterProps>;

export const Default: Story = {
  args: {}
};
