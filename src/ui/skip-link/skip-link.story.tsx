import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SkipLink } from '.';

export default {
  title: 'UI/SkipLink',
  component: SkipLink,
  args: {
    label: 'Skip to main content',
  },
} as ComponentMeta<typeof SkipLink>;

const Template: ComponentStory<typeof SkipLink> = (args) => (
  <SkipLink {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
};
