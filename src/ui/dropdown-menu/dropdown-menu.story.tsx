import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IconName } from 'ui/icon';

import { DropdownMenu } from '.';

export default {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  args: {
    menuButton: {
      icon: IconName.Kayak,
      label: 'My account',
      withDropdown: true,
      variant: 'secondary',
    },
    items: [
      {
        label: 'Profile',
        icon: IconName.User,
      },
      {
        label: 'Signout',
        icon: IconName.Exit,
      },
    ],
  },
} as ComponentMeta<typeof DropdownMenu>;

const Template: ComponentStory<typeof DropdownMenu> = (args) => (
  <DropdownMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
