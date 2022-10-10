import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileInput } from '.';

export default {
  title: 'UI/FileInput',
  component: FileInput,
  args: {
    name: 'my-file',
    accept: ['jpg', 'jpeg', 'png', 'avif', 'gif'],
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => (
  <FileInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};

export const Multiple = Template.bind({});
Multiple.args = {
  ...Default.args,
  maxFiles: 5,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};
