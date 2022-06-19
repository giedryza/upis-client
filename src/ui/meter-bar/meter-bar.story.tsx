import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MeterBar } from '.';

export default {
  title: 'UI/MeterBar',
  component: MeterBar,
  args: {
    label: 'Difficulty',
  },
} as ComponentMeta<typeof MeterBar>;

const Template: ComponentStory<typeof MeterBar> = (args) => (
  <MeterBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  value: 1.5,
  min: 0,
  max: 5,
  formatOptions: { style: 'decimal' },
};
