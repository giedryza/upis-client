import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SliderInput } from '.';

export default {
  title: 'UI/SliderInput',
  component: SliderInput,
  args: {
    label: 'Difficulty',
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof SliderInput>;

const Template: ComponentStory<typeof SliderInput> = (args) => (
  <div style={{ padding: 10 }}>
    <SliderInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
