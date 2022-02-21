import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SelectInput } from '.';

export default {
  title: 'UI/SelectInput',
  component: SelectInput,
  args: {
    name: 'gender',
    label: 'Gender',
    options: [
      { label: 'Male', value: 'm' },
      { label: 'Female', value: 'f' },
      { label: 'Bigender', value: 'b' },
      { label: 'Androgyne', value: 'a' },
      { label: 'Butch', value: 'bu' },
      { label: 'Cisgender', value: 'c' },
      { label: 'Genderfluid', value: 'g' },
      { label: 'Outlaw', value: 'o' },
    ],
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onFocus: { action: 'onFocus' },
    onBlur: { action: 'onBlur' },
  },
} as ComponentMeta<typeof SelectInput>;

const Template: ComponentStory<typeof SelectInput> = (args) => (
  <SelectInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Default.args,
  readonly: true,
};

export const Multiple = Template.bind({});
Multiple.args = {
  ...Default.args,
  multiple: true,
};

export const WithInfo = Template.bind({});
WithInfo.args = {
  ...Default.args,
  info: 'Select appropriate gender',
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: 'Please provide gender',
};
