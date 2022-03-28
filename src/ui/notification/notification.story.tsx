import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Notification } from '.';

export default {
  title: 'UI/Notification',
  component: Notification,
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
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => (
  <Notification {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
