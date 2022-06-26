import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StepperInput } from '.';

export default {
  title: 'UI/StepperInput',
  component: StepperInput,
  args: {
    label: 'label',
  },
} as ComponentMeta<typeof StepperInput>;

const Template: ComponentStory<typeof StepperInput> = (args) => (
  <StepperInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
