import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EmptyState } from '.';

export default {
  title: 'UI/EmptyState',
  component: EmptyState,
} as ComponentMeta<typeof EmptyState>;

const Template: ComponentStory<typeof EmptyState> = (args) => (
  <EmptyState {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  title: 'No tours',
  message: 'Add provider to start creating tours.',
  icon: 'bell',
  action: {
    as: 'button',
    label: 'Add provider',
    icon: 'plus',
  },
};
