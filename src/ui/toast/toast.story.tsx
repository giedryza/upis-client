import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Toast } from '.';

export default {
  title: 'UI/Toast',
  component: Toast,
  parameters: {
    backgrounds: {
      default: 'grey',
    },
  },
  args: {
    message: 'Invalid provider name. Try another.',
  },
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
