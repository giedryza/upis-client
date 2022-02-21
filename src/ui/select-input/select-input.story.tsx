import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SelectInput } from './select-input.component';

export default {
  title: 'UI/SelectInput',
  component: SelectInput,
  args: {
    name: 'gender',
  },
} as ComponentMeta<typeof SelectInput>;

const Template: ComponentStory<typeof SelectInput> = (args) => (
  <SelectInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  label: 'Gender',
  options: [
    { label: 'Male', value: 'm' },
    { label: 'Female', value: 'f' },
  ],
};
