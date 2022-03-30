import React from 'react';
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
    message: 'Invalid company name. Try another.',
  },
  argTypes: {
    onClose: { action: 'onClose' },
    onMouseEnter: { action: 'onMouseEnter' },
    onMouseLeave: { action: 'onMouseLeave' },
    onTouchStart: { action: 'onTouchStart' },
    onTouchEnd: { action: 'onTouchEnd' },
  },
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
