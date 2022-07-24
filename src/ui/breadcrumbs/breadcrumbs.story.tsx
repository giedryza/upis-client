import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breadcrumbs } from '.';

export default {
  title: 'UI/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    items: [
      { label: 'Account', url: '/account' },
      { label: 'Profile', url: '/account/profile' },
      { label: 'Change password' },
    ],
  },
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
