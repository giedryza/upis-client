import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FileInput } from '.';

export default {
  title: 'UI/FileInput',
  component: FileInput,
  args: {
    name: 'my-file',
    accept: ['jpg', 'jpeg', 'png', 'avif', 'gif'],
  },
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = (args) => (
  <FileInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
