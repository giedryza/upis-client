import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Menu } from '.';

export default {
  title: 'UI/Menu',
  component: Menu,
  args: {
    label: 'Actions',
  },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
