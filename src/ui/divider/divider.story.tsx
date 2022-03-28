import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Divider } from '.';

export default {
  title: 'UI/Divider',
  component: Divider,
  args: {
    label: 'label',
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <Divider {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
