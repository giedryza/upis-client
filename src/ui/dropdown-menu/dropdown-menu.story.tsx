import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DropdownMenu } from '.';

export default {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  args: {
    menuButton: {
      icon: 'kayak',
      label: 'My account',
      withDropdown: true,
      variant: 'secondary',
    },
    items: [
      {
        label: 'Profile',
        icon: 'user',
      },
      {
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
