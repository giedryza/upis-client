import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DropdownMenu } from '.';

export default {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  args: {
    menuButton: {
      as: 'button',
      icon: 'kayak',
      label: 'My account',
      withDropdown: true,
      variant: 'secondary',
    },
    items: [
      {
        as: 'button',
        label: 'Profile',
        icon: 'user',
      },
      {
        as: 'button',
        label: 'Signout',
        icon: 'exit',
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
