import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextInput } from '.';

export default {
  title: 'UI/TextInput',
  component: TextInput,
  args: {
    name: 'first-name',
    label: 'First name',
  },
  argTypes: {
    onChange: { action: 'onChange' },
    onFocus: { action: 'onFocus' },
    onBlur: { action: 'onBlur' },
  },
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Default = Template.bind({});

export const TextArea = Template.bind({});
TextArea.args = {
  ...Default.args,
  type: 'textarea',
  rows: 10,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  value: 'Giedrius',
};

export const Readonly = Template.bind({});
Readonly.args = {
  ...Default.args,
  readonly: true,
  value: 'Giedrius',
};

export const WithInfo = Template.bind({});
WithInfo.args = {
  ...Default.args,
  info: 'First name must contain letters only',
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: 'First name is required',
};
