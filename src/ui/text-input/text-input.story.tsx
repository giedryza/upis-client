import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextInput } from '.';

export default {
  title: 'UI/TextInput',
  component: TextInput,
  args: {
    name: 'first-name',
    label: 'First name',
  },
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
