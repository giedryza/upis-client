import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CheckboxInput } from '.';

export default {
  title: 'UI/CheckboxInput',
  component: CheckboxInput,
  args: {
    label: 'Agree to terms and conditions',
    name: 'agree',
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof CheckboxInput>;

const Template: ComponentStory<typeof CheckboxInput> = (args) => (
  <CheckboxInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
