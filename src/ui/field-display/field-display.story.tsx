import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FieldDisplay } from '.';

export default {
  title: 'UI/FieldDisplay',
  component: FieldDisplay,
  args: {
    label: 'Description',
  },
} as ComponentMeta<typeof FieldDisplay>;

const Template: ComponentStory<typeof FieldDisplay> = (args) => (
  <FieldDisplay {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  value: 'Baidarių nuoma Žemaitijoj',
};
