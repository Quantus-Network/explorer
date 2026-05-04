import type { Meta, StoryObj } from '@storybook/react-vite';

import { WithProviders } from '@/decorators/WithProviders';

import { Hero } from './Hero';

const meta: Meta = {
  title: 'Components/Features/Landing/Hero',
  component: Hero,
  parameters: {
    layout: 'centered'
  },
  decorators: [WithProviders],
  argTypes: {}
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: {}
};
