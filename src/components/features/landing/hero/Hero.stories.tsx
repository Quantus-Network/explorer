import type { Meta, StoryObj } from '@storybook/react';

import { WithProviders } from '@/decorators/WithProviders';

import { Hero, type HeroProps } from './Hero';

const meta: Meta<HeroProps> = {
  title: 'Components/Features/Landing/Hero',
  component: Hero,
  parameters: {
    layout: 'centered'
  },
  decorators: [WithProviders],
  argTypes: {}
};

export default meta;

type Story = StoryObj<HeroProps>;

export const Default: Story = {
  args: {}
};
